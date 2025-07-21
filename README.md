# Transportation Image Object Detection

This web application enables users to upload transportation-related images and perform object detection on those images.

## Setup


1. Clone this repository.
2. Download the MobileNet-SSD model files (`MobileNetSSD_deploy.prototxt` and `MobileNetSSD_deploy.caffemodel`) and place both files in `backend/models/`.
3. Install Docker and Docker Compose if not already installed.
4. Run `docker-compose up --build` to build and start the application.

## Usage

1. Access the frontend at `http://localhost:3000` (React app).
2. The backend API runs at `http://localhost:5000`.
2. Upload a transportation-related image using the provided form.
3. The application will perform object detection on the uploaded image and display both the original and processed images.

## Technologies Used

- Frontend: HTML, CSS, JavaScript (using React/Vue.js)
- Backend: Flask
- Object Detection: OpenCV
- Deployment: Docker
