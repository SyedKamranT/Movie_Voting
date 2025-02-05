from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from pymongo import MongoClient
import bcrypt
import os
from dotenv import load_dotenv

# Initialize Blueprint
main_routes = Blueprint('main_routes', __name__)

# Load environment variables from .env file
load_dotenv()

# MongoDB URI from .env file
MONGO_URI = os.getenv('MONGO_URI')

# MongoDB Connection
client = MongoClient(MONGO_URI)
db = client["movie_voting"]  # Change to your database name if needed

# User Signup Route
@main_routes.route('/signup', methods=['POST'])
def signup():
    data = request.json
    
    # Hash the password
    hashed_pw = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    
    # Check if the username already exists
    if db.users.find_one({"username": data['username']}):
        return jsonify({"message": "Username already taken"}), 400
    
    # Insert the new user into the users collection
    db.users.insert_one({"username": data['username'], "password": hashed_pw})
    
    return jsonify({"message": "User created successfully"}), 201


# User Login Route
@main_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    user = db.users.find_one({"username": data['username']})
    
    if user:
        # Get the stored hashed password from the DB and encode it to bytes
        stored_hashed_password = user['password'].encode('utf-8')  # Convert stored hash to bytes
        
        # Check if the entered password matches the hashed password in the database
        if bcrypt.checkpw(data['password'].encode('utf-8'), stored_hashed_password):
            # Generate JWT token if the credentials are correct
            token = create_access_token(identity=data['username'])
            return jsonify({"token": token}), 200
    
    return jsonify({"message": "Invalid credentials"}), 401


# Fetch Movies Route (GET)
@main_routes.route('/movies', methods=['GET'])
def get_movies():
    # Fetch movies from the movies collection
    movies = list(db.movies.find({}, {"_id": 0}))  # Excluding the "_id" field in the response
    
    if movies:
        return jsonify(movies), 200
    else:
        return jsonify({"message": "No movies found"}), 404
