from app import create_app, socketio
import os

# Create Flask app
app = create_app()

if __name__ == "__main__":
    # Get the port from the environment variable or default to 5000 for local development
    port = int(os.environ.get("PORT", 5000))
    
    # Run Flask app with SocketIO
    socketio.run(app, host="0.0.0.0", port=port, debug=True)
