from app import create_app, socketio

# Create Flask app
app = create_app()

if __name__ == "__main__":
    # Run Flask app with SocketIO
    socketio.run(app, debug=True, port=8889, allow_unsafe_werkzeug=True)
