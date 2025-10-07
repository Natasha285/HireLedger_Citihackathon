
import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error

# Simulate skill assessment dataset
np.random.seed(42)
data = {
    "candidate_id": range(1, 301),
    "avg_response_time": np.random.normal(20, 5, 300),
    "correct_rate": np.random.uniform(0.4, 1.0, 300),
    "question_difficulty": np.random.randint(1, 5, 300),
    "attempts_trend": np.random.uniform(-0.5, 1.0, 300)
}

df = pd.DataFrame(data)
df["SkillScore"] = (
    0.5 * df["correct_rate"] * 100 +
    0.2 * (5 - df["avg_response_time"]/5) +
    0.3 * (df["attempts_trend"] + 0.5) * 100
) + np.random.normal(0, 5, 300)
df["SkillScore"] = df["SkillScore"].clip(0, 100)
df.to_csv("skill_data.csv", index=False)

# Train model
X = df.drop(columns=["candidate_id", "SkillScore"])
y = df["SkillScore"]

model = GradientBoostingRegressor()
model.fit(X, y)
preds = model.predict(X)
print(" SkillScore Model MAE:", mean_absolute_error(y, preds))
