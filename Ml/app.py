from flask import Flask, request, jsonify 
import joblib
import numpy as np
import os

app = Flask(__name__)
model = joblib.load(os.path.join("models", "bot_detection_model.joblib"))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = data['features']  # List of 20 values
    features = np.array(features).reshape(1, -1)
    prediction = model.predict(features)[0]
    return jsonify({'prediction': int(prediction)})

if __name__ == '__main__':
    app.run(port=5002)
