
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import r2_score, mean_absolute_error

# Load SkillScore and TrustScore datasets
skill_df = pd.read_csv("skill_data.csv")
trust_df = pd.read_csv("trust_data.csv")

# Merge on candidate_id
merged = pd.merge(skill_df, trust_df, on="candidate_id")

# Prepare JobFit dataset
merged["JobPerformance"] = (
    0.6 * merged["SkillScore"] +
    0.4 * merged["TrustScore"]
) + np.random.normal(0, 5, len(merged))

X = merged[["SkillScore", "TrustScore", "accuracy", "typing_speed"]]
y = merged["JobPerformance"]

# Split & train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = GradientBoostingRegressor(random_state=42)
model.fit(X_train, y_train)

preds = model.predict(X_test)

print(" JobFit Model R²:", r2_score(y_test, preds))
print("MAE:", mean_absolute_error(y_test, preds))

# Example predicted performance
sample = pd.DataFrame({
    "SkillScore": [85],
    "TrustScore": [90],
    "accuracy": [0.92],
    "typing_speed": [45]
})
pred_perf = model.predict(sample)[0]
print("\nPredicted Job Performance:", round(pred_perf, 2))
