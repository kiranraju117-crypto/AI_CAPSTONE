import os
import urllib.request
import pandas as pd

DATASET_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_FILE = os.path.join(DATASET_DIR, 'emails.csv')
DATASET_URL = 'https://raw.githubusercontent.com/YBI-Foundation/Dataset/main/Spam%20Email.csv'

def download_and_prepare():
    os.makedirs(DATASET_DIR, exist_ok=True)
    print(f"Downloading authentic spam dataset from {DATASET_URL}...")
    
    urllib.request.urlretrieve(DATASET_URL, OUTPUT_FILE)
    print(f"Dataset successfully saved to {OUTPUT_FILE}")
    
    df = pd.read_csv(OUTPUT_FILE)
    print(f"Dataset loaded: {len(df)} total emails")
    print(f"Columns: {list(df.columns)}")
    print(f"Label distribution:")
    print(df['Label'].value_counts())
    
    # Ensure standard schema: 'text' and 'label'
    # In this dataset: 'Text' contains full email (Subject + Body) and 'Label' has 0 (ham) / 1 (spam)
    return df

if __name__ == '__main__':
    download_and_prepare()
