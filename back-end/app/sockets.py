from . import socketio
from flask_socketio import emit
from dotenv import load_dotenv
from pymongo import MongoClient
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# MongoDB Connection
MONGO_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_URI)
db = client["movie_voting"] 

@socketio.on('connect')
def on_connect():
    logger.info("Client connected")
    emit('message', {"message": "Welcome to the Real-Time Server"})
    
@socketio.on('disconnect')
def on_disconnect():
    logger.info("Client disconnected")

@socketio.on('vote_update')
def handle_vote_update(data):
    try:
        # This is now primarily for real-time broadcasting
        logger.info(f"Received vote update: {data}")
        emit('vote_update', data, broadcast=True)
    except Exception as e:
        logger.error(f"Error handling vote update: {e}")

@socketio.on('comment')
def on_comment(data):
    try:
        emit('comment_update', data, broadcast=True)
    except Exception as e:
        logger.error(f"Error handling comment event: {e}")