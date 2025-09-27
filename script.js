// Function to load the TensorFlow.js model from the backend
async function loadModel() {
    console.log("Loading model...");
    // The path here should match the path set in your backend's StaticFiles mount.
    const model = await tf.loadLayersModel('./static/model.json');
    console.log("Model loaded successfully!");
    return model;
}

// Global variable to hold the loaded model
let model;

// Load the model as soon as the page loads
window.onload = async () => {
    model = await loadModel();
};

// Function to handle the image upload and prediction
async function predictImage() {
    const fileInput = document.getElementById('image-upload');
    const statusDiv = document.getElementById('status');

    if (fileInput.files.length === 0) {
        statusDiv.innerText = "Please select an image first.";
        return;
    }

    statusDiv.innerText = "Predicting...";
    
    // Get the image as a tensor and preprocess it
    const imageFile = fileInput.files[0];
    const imageTensor = await preprocessImage(imageFile);

    // Make the prediction
    const prediction = await model.predict(imageTensor);
    const predictionData = prediction.dataSync()[0];

    // Interpret the result
    const result = predictionData > 0.5 ? "Fake" : "Real";
    const confidence = (predictionData * 100).toFixed(2);
    
    statusDiv.innerText = `Prediction: ${result} (${confidence}%)`;
}

// Preprocessing function to match your model's input size and normalization
async function preprocessImage(imageFile) {
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);
    await new Promise(resolve => img.onload = resolve);

    // Resize the image to 256x256 and normalize
    const tensor = tf.browser.fromPixels(img)
        .resizeNearestNeighbor([256, 256])
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();
        
    return tensor;
}