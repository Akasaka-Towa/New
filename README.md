# Deep Shield - AI Image Detector

Deep Shield is a web application that uses a deep learning model to detect whether an image is a real photograph or a fake, AI-generated/manipulated image.

This project uses a full-stack architecture for deployment:
- **Frontend**: A simple HTML, CSS, and JavaScript interface that runs the prediction in the user's browser.
- **Backend**: A lightweight FastAPI server that hosts the model files and the frontend assets.

The model used is an **EfficientNetB3** fine-tuned on a custom dataset to achieve high accuracy in detecting fake images.

## Project Structure

- `/backend/`: Contains the FastAPI server code and the TensorFlow.js model files.
- `/frontend/`: Contains the user-facing web application (HTML, CSS, JS).

## How it Works

1.  A user uploads an image through the web interface.
2.  The JavaScript on the frontend loads the TensorFlow.js model files from the backend.
3.  The image is preprocessed and fed into the model directly within the user's browser.
4.  The model outputs a prediction (a confidence score).
5.  The result is displayed back to the user on the page.

This architecture is highly scalable and cost-effective because the computationally expensive task of running the model is offloaded from the server to the client's device.

## Deployment

This project is designed for deployment on platforms like Render, which can host both the backend server and the static frontend files from a single GitHub repository.

## Installation and Local Run

To run this project locally for development, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Navigate to the backend directory and install dependencies**:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

3.  **Run the FastAPI server**:
    ```bash
    uvicorn main:app --reload
    ```
    The application will be available at `http://127.0.0.1:8000`.