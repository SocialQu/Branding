import tensorflow_decision_forests as tfdf
import pandas as pd

# Load a dataset in a Pandas dataframe.
train_df = pd.read_csv("data/tweets.csv")
test_df = pd.read_csv("data/tweets.csv")

# Convert the dataset into a TensorFlow dataset.
train_ds = tfdf.keras.pd_dataframe_to_tf_dataset(train_df, label="ENGAGEMENTS")
test_ds = tfdf.keras.pd_dataframe_to_tf_dataset(test_df, label="ENGAGEMENTS")

# Train a Random Forest model.
model = tfdf.keras.RandomForestModel()
model.fit(train_ds)

# Summary of the model structure.
model.summary()

# Evaluate the model.
model.evaluate(test_ds)

# Export the model to a SavedModel.
model.save("data/models/decision_forest")
