from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from pymongo import MongoClient
import bcrypt
import os
from dotenv import load_dotenv


main_routes = Blueprint('main_routes', __name__)


load_dotenv()


MONGO_URI = os.getenv('MONGO_URI')


client = MongoClient(MONGO_URI)
db = client["movie_voting_app"]


@main_routes.route('/signup', methods=['POST'])
def signup():
    data = request.json
    
    hashed_pw = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    
    if db.users.find_one({"username": data['username']}):
        return jsonify({"message": "Username already taken"}), 400
    
    db.users.insert_one({"username": data['username'], "password": hashed_pw})
    return jsonify({"message": "User created successfully"}), 201


@main_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    user = db.users.find_one({"username": data['username']})
    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
        token = create_access_token(identity=data['username'])
        return jsonify({"token": token}), 200
    return jsonify({"message": "Invalid credentials"}), 401


@main_routes.route('/movies', methods=['GET'])
@jwt_required()
def get_movies():
    movies = list(db.movies.find({}, {"_id": 0}))  
    return jsonify(movies), 200
