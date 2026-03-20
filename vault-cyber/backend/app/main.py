from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .chatbot import get_response
from .data import data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chatbot/")
def chatbot(req: dict):
    return {"response": get_response(req["message"], req["country"])}

@app.get("/data/{country}")
def get_data(country: str):
    return data[country]