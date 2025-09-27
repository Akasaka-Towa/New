from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import os

app = FastAPI()

# Mount the directory containing your TensorFlow.js model files.
# The 'name' here is a label for your static files route.
# Replace 'tfjs_model' with the name of your model's folder.
app.mount("/static", StaticFiles(directory="tfjs_model"), name="static")

# Serve the index.html file from your frontend directory
@app.get("/")
async def serve_frontend():
    with open(os.path.join("../frontend", "index.html")) as f:
        return HTMLResponse(content=f.read(), status_code=200)