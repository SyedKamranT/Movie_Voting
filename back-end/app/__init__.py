from flask import Flask
from flask_socketio import SocketIO
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os
from flask_cors import CORS


socketio = SocketIO(cors_allowed_origins="*", async_mode="threading", message_queue=None)
jwt = JWTManager()  

def create_app():
    app = Flask(__name__)
    load_dotenv() 

    CORS(app, resources={r"/*": {"origins": "*"}})
    socketio = SocketIO(app, cors_allowed_origins="*")
    
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY','default_secret_key')
    
    # Import and register routes
    from .routes import main_routes
    from .routes import voting_routes
    app.register_blueprint(main_routes)
    app.register_blueprint(voting_routes)
    socketio.init_app(app)
    jwt.init_app(app)  
    
    return app
