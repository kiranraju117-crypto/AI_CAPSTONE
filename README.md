# 🛡️ MailSentry — AI-Based Email Spam Detection System

An end-to-end Machine Learning web application that accurately detects email spam using TF-IDF feature extraction and multiple calibrated classifiers trained on an authentic benchmark dataset.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Open_Website-success?style=for-the-badge&logo=googlechrome&logoColor=white)](https://kiranraju117-crypto.github.io/AI_CAPSTONE/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kiranraju117-crypto/AI_CAPSTONE)

> 🔗 **Live Website URL:** **[https://kiranraju117-crypto.github.io/AI_CAPSTONE/](https://kiranraju117-crypto.github.io/AI_CAPSTONE/)**

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Python](https://img.shields.io/badge/Python-3.13-blue)
![React](https://img.shields.io/badge/React-18-61DAFB)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF)
![scikit--learn](https://img.shields.io/badge/scikit--learn-1.8-F7931E)

---

## 🚀 Key Features

- **Multi-Model Comparison**: Real-time evaluation and predictions from 4 distinct classifiers:
  - **Logistic Regression** (🏆 Best Performer: **98.55% Accuracy**, **97.50% F1**)
  - **Linear SVM** (Calibrated probability: **98.45% Accuracy**, **97.32% F1**)
  - **Random Forest** (**97.78% Accuracy**, **96.22% F1**)
  - **Multinomial Naive Bayes** (**95.46% Accuracy**, **92.43% F1**)
- **Authentic Dataset**: Trained on 5,171 real-world emails (3,672 legitimate ham emails and 1,499 spam emails).
- **Explainable AI (XAI)**: Dynamically extracts and highlights the exact keywords/tokens in the email that triggered the spam classification.
- **Modern Interactive Dashboard**: Built with React, Tailwind CSS, Recharts, and Framer Motion.
- **RESTful ML Backend**: Python Flask microservice providing `/api/predict`, `/api/metrics`, `/api/models`, `/api/history`, and `/api/health`.

---

## 📊 Model Evaluation Results (1,035 Held-Out Test Emails)

| Classifier | Accuracy | Precision | Recall | F1 Score |
| :--- | :---: | :---: | :---: | :---: |
| **Logistic Regression** | **98.55%** | **97.66%** | **97.33%** | **97.50%** |
| **Linear SVM** | **98.45%** | **97.97%** | **96.67%** | **97.32%** |
| **Random Forest** | **97.78%** | **94.82%** | **97.67%** | **96.22%** |
| **Multinomial Naive Bayes** | **95.46%** | **89.41%** | **95.67%** | **92.43%** |

---

## 🛠️ Architecture

```text
├── dataset/
│   ├── download_dataset.py       # Script to fetch & prepare the 5,171 emails
│   └── emails.csv                # Benchmark email dataset
├── backend/
│   ├── train.py                  # End-to-end ML training & evaluation pipeline
│   ├── app.py                    # Production Flask REST API
│   └── saved_models/             # Serialized models (.joblib) & metrics (.json)
├── src/
│   ├── components/               # React UI components (Dashboard, Analyze, History)
│   ├── pages/                    # Application pages
│   ├── services/                 # API connection layer
│   └── types/                    # TypeScript interfaces
├── vite.config.ts                # Dev server proxy configuration (/api -> :5000)
└── package.json                  # Frontend dependencies
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Python** (v3.10+)

### 1. Install Dependencies

**Python ML Dependencies:**
```bash
pip install scikit-learn pandas numpy joblib flask flask-cors
```

**Frontend Dependencies:**
```bash
npm install
```

---

### 2. Train the Models (Optional - Pretrained models already included)
```bash
python backend/train.py
```

---

### 3. Run the Application

**Terminal 1 — Start the Python ML API:**
```bash
python backend/app.py
```
*(Runs on `http://127.0.0.1:5000`)*

**Terminal 2 — Start the Frontend Dev Server:**
```bash
npm run dev
```
*(Runs on `http://localhost:5173`)*

Open **http://localhost:5173** in your browser to start classifying emails!
