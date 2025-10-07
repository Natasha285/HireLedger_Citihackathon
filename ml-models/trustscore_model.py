    
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# 1️⃣ Generate synthetic data
np.random.seed(42)
num_candidates = 300

data = {
    "candidate_id": range(1, num_candidates+1),
    "blockchain_verified": np.random.randint(0, 2, num_candidates),
    "avg_response_time": np.random.normal(20, 5, num_candidates),
    "time_variance": np.random.normal(3, 1.5, num_candidates),
    "accuracy": np.random.uniform(0.5, 1.0, num_candidates),
    "typing_speed": np.random.normal(40, 10, num_candidates),
    "degree_verified": np.random.randint(0, 2, num_candidates),
    "project_match": np.random.randint(0, 2, num_candidates),
}

# Calculate TrustScore
data["TrustScore"] = (
    0.3 * data["blockchain_verified"] * 100 +
    0.3 * data["accuracy"] * 100 +
    0.2 * data["degree_verified"] * 100 +
    0.2 * data["project_match"] * 100
) + np.random.normal(0, 5, num_candidates)

df = pd.DataFrame(data)
df["TrustScore"] = df["TrustScore"].clip(0, 100)
df.to_csv("trust_data.csv", index=False)

# 2️⃣ Load data
X = df.drop(columns=["candidate_id", "TrustScore"])
y = (df["TrustScore"] > 70).astype(int)

# 3️⃣ Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4️⃣ Train Random Forest
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 5️⃣ Evaluate
preds = model.predict(X_test)
print(" TrustScore Model Results")
print("Accuracy:", accuracy_score(y_test, preds))
print(classification_report(y_test, preds))

# 6️⃣ Predict continuous TrustScore
probs = model.predict_proba(X_test)[:, 1] * 100
results = X_test.copy()
results["Predicted_TrustScore"] = probs.round(2)
print("\nSample predictions:\n", results.head())
