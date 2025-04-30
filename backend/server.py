# server.py

from fastapi import FastAPI
from pydantic import BaseModel
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from fastapi.middleware.cors import CORSMiddleware
import torch
import gdown
import zipfile
import os

app = FastAPI()

# CORS settings (adjust allow_origins if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development: allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_dir = "generative_model"
zip_path = "generative_model.zip"

if not os.path.exists(model_dir):
    print("Downloading model from Google Drive...")
    gdown.download(
        url="https://drive.google.com/uc?id=1rymYjq0CgyYLK54xBgZAgiWMt0ZHWN0t",
        output=zip_path,
        quiet=False
    )
    print("Extracting model...")
    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(".")
    print("Model ready.")

model = GPT2LMHeadModel.from_pretrained("generative_model")
tokenizer = GPT2Tokenizer.from_pretrained("generative_model")
model.eval()

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

class TextRequest(BaseModel):
    text: str

@app.post("/predict")
def predict(req: TextRequest):
    prompt = f"User: {req.text}\nDog:"
    inputs = tokenizer(prompt, return_tensors="pt").to(device)

    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_length=50,
            num_return_sequences=1,
            pad_token_id=tokenizer.eos_token_id,
            no_repeat_ngram_size=2,
            early_stopping=True,
        )

    result = tokenizer.decode(output[0], skip_special_tokens=True)

    # extract response part
    if "Dog:" in result:
        response = result.split("Dog:")[-1].strip()
    else:
        response = result.strip()

    return {"prediction": response}
