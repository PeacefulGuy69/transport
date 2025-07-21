



from flask import Flask, request, jsonify
import cv2
import numpy as np

from werkzeug.utils import secure_filename
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


# Use MobileNet-SSD for object detection
MODEL_DIR = os.path.join(os.path.dirname(__file__), 'models')
PROTOTXT = os.path.join(MODEL_DIR, 'MobileNetSSD_deploy.prototxt')
CAFFEMODEL = os.path.join(MODEL_DIR, 'MobileNetSSD_deploy.caffemodel')
CLASSES = [
    "background", "aeroplane", "bicycle", "bird", "boat",
    "bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
    "dog", "horse", "motorbike", "person", "pottedplant",
    "sheep", "sofa", "train", "tvmonitor"
]
COLORS = np.random.uniform(0, 255, size=(len(CLASSES), 3))
net = cv2.dnn.readNetFromCaffe(PROTOTXT, CAFFEMODEL)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    filename = secure_filename(file.filename)
    # Read image file as numpy array
    file_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    if img is None:
        return jsonify({'error': 'Invalid image'}), 400
    # Prepare input blob and perform detection with MobileNet-SSD
    (h, w) = img.shape[:2]
    blob = cv2.dnn.blobFromImage(cv2.resize(img, (300, 300)), 0.007843, (300, 300), 127.5)
    net.setInput(blob)
    detections = net.forward()
    detected_count = 0
    detected_objects = []
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.5:
            idx = int(detections[0, 0, i, 1])
            class_name = CLASSES[idx]
            detected_objects.append(class_name)
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (startX, startY, endX, endY) = box.astype("int")
            label = f"{class_name}: {confidence*100:.1f}%"
            color = COLORS[idx]
            cv2.rectangle(img, (startX, startY), (endX, endY), color, 2)
            y = startY - 15 if startY - 15 > 15 else startY + 15
            cv2.putText(img, label, (startX, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
            detected_count += 1
    # Encode processed image to base64
    _, buffer = cv2.imencode('.jpg', img)
    import base64
    img_base64 = base64.b64encode(buffer).decode('utf-8')
    # Count each object type
    from collections import Counter
    object_counts = dict(Counter(detected_objects))
    return jsonify({
        'detected_count': detected_count,
        'object_counts': object_counts,
        'detected_objects': detected_objects,
        'processed_image': img_base64
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
