import os
import json
import re
import uuid
from datetime import datetime, timezone
import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SAVED_MODELS_DIR = os.path.join(BASE_DIR, 'saved_models')
BUNDLE_PATH = os.path.join(SAVED_MODELS_DIR, 'spam_models.joblib')
METRICS_PATH = os.path.join(SAVED_MODELS_DIR, 'metrics.json')
HISTORY_PATH = os.path.join(SAVED_MODELS_DIR, 'history.json')

app = Flask(__name__)
CORS(app)

# Load trained models & vectorizer
if not os.path.exists(BUNDLE_PATH):
    raise FileNotFoundError(f"Model bundle not found at {BUNDLE_PATH}. Run train.py first.")

bundle = joblib.load(BUNDLE_PATH)
vectorizer = bundle['vectorizer']
models = bundle['models']
feature_names = bundle['feature_names']
spam_weights = bundle['spam_weights']

# Feature index lookup for fast indicator extraction
feature_to_idx = {feat: idx for idx, feat in enumerate(feature_names)}

def preprocess_text(text: str) -> str:
    if not isinstance(text, str):
        return ""
    text = re.sub(r'^(re:|fwd:|subject:)\s*', '', text, flags=re.IGNORECASE)
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_indicators(clean_text: str, tfidf_vec, is_spam: bool, top_n: int = 5) -> list[str]:
    """Find words present in the email that contributed most strongly to the classification."""
    tokens = set(clean_text.split())
    candidates = []
    
    for token in tokens:
        if token in feature_to_idx:
            idx = feature_to_idx[token]
            weight = spam_weights[idx]
            tfidf_val = tfidf_vec[0, idx]
            if tfidf_val > 0:
                score = weight * tfidf_val
                candidates.append((token, score, weight))
                
    if not candidates:
        # Fallback to general tokens found in vocabulary
        for token in tokens:
            if len(token) > 3 and token in feature_to_idx:
                candidates.append((token, 0, spam_weights[feature_to_idx[token]]))

    if is_spam:
        # Sort by highest spam correlation
        candidates.sort(key=lambda x: x[1] if x[1] != 0 else x[2], reverse=True)
    else:
        # Sort by most legitimate/ham correlation (lowest/negative weights)
        candidates.sort(key=lambda x: x[1] if x[1] != 0 else x[2])
        
    indicators = [c[0] for c in candidates[:top_n]]
    return indicators

def load_history():
    if os.path.exists(HISTORY_PATH):
        try:
            with open(HISTORY_PATH, 'r') as f:
                return json.load(f)
        except Exception:
            return []
    return []

def save_history(records):
    try:
        with open(HISTORY_PATH, 'w') as f:
            json.dump(records[:100], f, indent=2)  # Keep latest 100
    except Exception as e:
        print(f"Error saving history: {e}")

# In-memory history cache
detection_history = load_history()

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "service": "MailSentry Python ML Backend",
        "models_loaded": list(models.keys()),
        "features": len(feature_names)
    })

@app.route('/api/models', methods=['GET'])
def get_models():
    return jsonify(list(models.keys()))

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    if os.path.exists(METRICS_PATH):
        with open(METRICS_PATH, 'r') as f:
            return jsonify(json.load(f))
    return jsonify([]), 404

@app.route('/api/history', methods=['GET'])
def get_history():
    return jsonify(detection_history)

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True, silent=True) or {}
    subject = data.get('subject', '').strip()
    body = data.get('body', '').strip()
    model_name = data.get('model', 'Linear SVM')
    
    if not subject and not body:
        return jsonify({"error": "Please enter an email subject or body."}), 400
        
    combined_raw = f"{subject} {body}".strip()
    if len(combined_raw) < 5:
        return jsonify({"error": "Please provide valid email content."}), 400
        
    clean = preprocess_text(combined_raw)
    tfidf_vec = vectorizer.transform([clean])
    
    if model_name not in models:
        model_name = 'Linear SVM'
        
    model = models[model_name]
    
    # Calculate calibrated probabilities
    if hasattr(model, 'predict_proba'):
        proba = model.predict_proba(tfidf_vec)[0]
        spam_prob = float(proba[1])
    else:
        # Fallback for models without direct predict_proba
        decision = model.decision_function(tfidf_vec)[0]
        spam_prob = float(1.0 / (1.0 + np.exp(-decision)))
        
    prediction = 'spam' if spam_prob >= 0.5 else 'ham'
    confidence = spam_prob if prediction == 'spam' else (1.0 - spam_prob)
    
    indicators = extract_indicators(clean, tfidf_vec, is_spam=(prediction == 'spam'), top_n=5)
    
    if prediction == 'spam':
        top_words_str = f" ('{', '.join(indicators[:3])}')" if indicators else ""
        explanation = (
            f"The real {model_name} classifier flagged this email as SPAM with "
            f"{confidence * 100:.1f}% confidence. Detected high-risk spam indicators{top_words_str} "
            f"closely match patterns learned from the authentic email training dataset."
        )
    else:
        top_words_str = f" ('{', '.join(indicators[:3])}')" if indicators else ""
        explanation = (
            f"The real {model_name} classifier marked this email as legitimate (HAM) with "
            f"{confidence * 100:.1f}% confidence. The message text lacks characteristic spam features "
            f"and aligns with normal communication patterns."
        )
        
    processed_at = datetime.now(timezone.utc).isoformat()
    
    result = {
        "prediction": prediction,
        "confidence": round(confidence, 4),
        "spamProbability": round(spam_prob, 4),
        "model": model_name,
        "indicators": indicators,
        "explanation": explanation,
        "processedAt": processed_at
    }
    
    # Store into history
    record = {
        "id": f"det_{uuid.uuid4().hex[:8]}",
        "subject": subject or "(no subject)",
        "body": body,
        "classification": prediction,
        "confidence": round(confidence, 4),
        "spamProbability": round(spam_prob, 4),
        "model": model_name,
        "date": processed_at,
        "indicators": indicators,
        "explanation": explanation
    }
    detection_history.insert(0, record)
    save_history(detection_history)
    
    return jsonify(result)

if __name__ == '__main__':
    print("Starting MailSentry Python ML API on http://127.0.0.1:5000 ...")
    app.run(host='127.0.0.1', port=5000, debug=False)
