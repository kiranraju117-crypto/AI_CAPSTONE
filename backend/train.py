import os
import json
import re
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC
from sklearn.calibration import CalibratedClassifierCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
DATASET_PATH = os.path.join(PROJECT_ROOT, 'dataset', 'emails.csv')
SAVED_MODELS_DIR = os.path.join(BASE_DIR, 'saved_models')

def preprocess_text(text: str) -> str:
    """Clean and normalize email text."""
    if not isinstance(text, str):
        return ""
    # Remove subject prefix if repeated
    text = re.sub(r'^(re:|fwd:|subject:)\s*', '', text, flags=re.IGNORECASE)
    # Lowercase and clean special chars
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def train_and_evaluate():
    os.makedirs(SAVED_MODELS_DIR, exist_ok=True)
    
    print("=" * 60)
    print("1. Loading Real Dataset...")
    print("=" * 60)
    if not os.path.exists(DATASET_PATH):
        raise FileNotFoundError(f"Dataset not found at {DATASET_PATH}. Please run download_dataset.py first.")
    
    df = pd.read_csv(DATASET_PATH)
    df['Text'] = df['Text'].fillna('').astype(str)
    df['clean_text'] = df['Text'].apply(preprocess_text)
    
    X = df['clean_text']
    y = df['Label'].astype(int)
    
    print(f"Total dataset size: {len(df)} samples")
    print(f"Ham (0): {(y == 0).sum()}, Spam (1): {(y == 1).sum()}")
    
    print("\n" + "=" * 60)
    print("2. Splitting Train / Test Data (80% Train, 20% Test)...")
    print("=" * 60)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    print(f"Training samples: {len(X_train)}, Testing samples: {len(X_test)}")
    
    print("\n" + "=" * 60)
    print("3. TF-IDF Feature Extraction (5000 max features, n-grams (1, 2))...")
    print("=" * 60)
    vectorizer = TfidfVectorizer(
        max_features=5000,
        ngram_range=(1, 2),
        stop_words='english',
        sublinear_tf=True
    )
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)
    feature_names = np.array(vectorizer.get_feature_names_out())
    
    print(f"Extracted {X_train_tfidf.shape[1]} features.")
    
    print("\n" + "=" * 60)
    print("4. Training Candidate Classifiers on Real Data...")
    print("=" * 60)
    
    models_definitions = {
        'Multinomial Naive Bayes': MultinomialNB(alpha=0.1),
        'Logistic Regression': LogisticRegression(max_iter=1000, C=2.0, random_state=42),
        'Linear SVM': CalibratedClassifierCV(LinearSVC(C=1.0, random_state=42, max_iter=2000)),
        'Random Forest': RandomForestClassifier(n_estimators=100, max_depth=30, random_state=42, n_jobs=-1)
    }
    
    trained_models = {}
    metrics_list = []
    
    for model_name, model in models_definitions.items():
        print(f"--> Training {model_name}...")
        model.fit(X_train_tfidf, y_train)
        trained_models[model_name] = model
        
        # Test predictions
        y_pred = model.predict(X_test_tfidf)
        
        acc = float(accuracy_score(y_test, y_pred))
        prec = float(precision_score(y_test, y_pred, zero_division=0))
        rec = float(recall_score(y_test, y_pred, zero_division=0))
        f1 = float(f1_score(y_test, y_pred, zero_division=0))
        
        print(f"    Results for {model_name}:")
        print(f"    Accuracy:  {acc * 100:.2f}%")
        print(f"    Precision: {prec * 100:.2f}%")
        print(f"    Recall:    {rec * 100:.2f}%")
        print(f"    F1 Score:  {f1 * 100:.2f}%")
        
        metrics_list.append({
            "model": model_name,
            "accuracy": round(acc, 4),
            "precision": round(prec, 4),
            "recall": round(rec, 4),
            "f1": round(f1, 4)
        })
    
    # Calculate feature log probabilities from Naive Bayes or Logistic Regression for spam word indicators
    log_reg = trained_models['Logistic Regression']
    spam_weights = log_reg.coef_[0]
    
    print("\n" + "=" * 60)
    print("5. Saving Trained Models and Real Evaluation Metrics...")
    print("=" * 60)
    
    # Save metrics.json
    metrics_file = os.path.join(SAVED_MODELS_DIR, 'metrics.json')
    with open(metrics_file, 'w') as f:
        json.dump(metrics_list, f, indent=2)
    print(f"Saved real metrics to: {metrics_file}")
    
    # Save model bundle
    bundle = {
        'vectorizer': vectorizer,
        'models': trained_models,
        'feature_names': feature_names,
        'spam_weights': spam_weights
    }
    bundle_file = os.path.join(SAVED_MODELS_DIR, 'spam_models.joblib')
    joblib.dump(bundle, bundle_file)
    print(f"Saved model bundle to: {bundle_file}")
    print("\nTraining Complete! Real machine learning models are ready for production inference.")

if __name__ == '__main__':
    train_and_evaluate()
