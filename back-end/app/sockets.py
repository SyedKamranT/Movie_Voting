from . import socketio
from flask_socketio import emit
from dotenv import load_dotenv
from pymongo import MongoClient
from bson.objectid import ObjectId  # Add this import
import bcrypt
import os

MONGO_URI = os.getenv('MONGO_URI')

# MongoDB Connection
client = MongoClient(MONGO_URI)
db = client["movie_voting"] 

@socketio.on('connect')
def on_connect():
    print("Client connected")
    emit('message', {"message": "Welcome to the Real-Time Server"})
    
    
@socketio.on('disconnect')
def on_disconnet():
    print(" Client disconnected")

@socketio.on('vote')
def on_vote(data):
    try:
        movie_id = data['movieId']
        rating = data['rating']
        comment = data['comment']
        
        # Update the movie document in MongoDB
        movie = db.movies.find_one({'_id': ObjectId(movie_id)})
        if movie:
            db.movies.update_one(
                {'_id': ObjectId(movie_id)},
                {
                    '$inc': {'votes': 1},
                    '$push': {
                        'reviews': {
                            'user': 'Anonymous',  # Or get from session
                            'rating': rating,
                            'comment': comment
                        }
                    }
                }
            )
            emit('vote_update', {'success': True}, broadcast=True)
        else:
            emit('vote_update', {'success': False, 'error': 'Movie not found'})
    except Exception as e:
        print(f"Error handling vote event: {e}")
        emit('vote_update', {'success': False, 'error': str(e)})
               
@socketio.on('comment')
def on_comment(data):
    try:
        emit('comment_update', data, broadcast=True)
    except Exception as e:
        print(f"Error handling comment event{e}")
    