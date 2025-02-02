from . import socketio
from flask_socketio import emit

@socketio.on('connect')
def on_connect():
    print("Client connected")
    emit('message', {"message": "Welcome to the Real-Time Server"})

@socketio.on('vote')
def on_vote(data):
    emit('vote_update', data, broadcast=True)
