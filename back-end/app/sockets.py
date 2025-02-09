from . import socketio
from flask_socketio import emit

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
        emit('vote_update', data, broadcast=True)
    except Exception as e:
        print(f"Error handling vote evenet{e}")
               
@socketio.on('comment')
def on_comment(data):
    try:
        emit('comment_update', data, broadcast=True)
    except Exception as e:
        print(f"Error handling comment event{e}")
    