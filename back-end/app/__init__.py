from flask import Flask
from flask_socketio import SocketIO
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os


socketio = SocketIO(cors_allowed_origins="*")
jwt = JWTManager()  

def create_app():
    app = Flask(__name__)
    load_dotenv()  
    
    
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    
    # Import and register routes
    from .routes import main_routes
    app.register_blueprint(main_routes)
    
    
    socketio.init_app(app)
    jwt.init_app(app)  
    
    return app
