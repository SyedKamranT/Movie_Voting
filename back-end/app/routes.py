from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from flask_socketio import emit
from pymongo import MongoClient
import bcrypt
import os
from dotenv import load_dotenv
from bson.objectid import ObjectId

# Initialize Blueprint
main_routes = Blueprint('main_routes', __name__)
voting_routes = Blueprint('voting_routes', __name__, url_prefix='/api')

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
    
    if not data.get("username") or not data.get("password"):
        return jsonify({"message": "Username and password are required"}), 400
    
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

    # Find the user in the database by username
    user = db.users.find_one({"username": data['username']})

    if user:
        # Extract the stored hashed password (already stored as binary in MongoDB)
        stored_hashed_password = user['password']

        # Check if the entered password matches the hashed password in the database
        if bcrypt.checkpw(data['password'].encode('utf-8'), stored_hashed_password):
            # Generate a JWT token if the credentials are correct
            token = create_access_token(identity=data['username'])
            return jsonify({"token": token}), 200

    # If username doesn't exist or password doesn't match
    return jsonify({"message": "Invalid credentials"}), 401



# Fetch Movies Route (GET)
@main_routes.route('/movies', methods=['GET'])
@jwt_required()
def get_movies():
    # Fetch movies from the movies collection
    movies = list(db.movies.find({}))  # Fetch all movies with all fields, including _id
    
    # Convert ObjectId to string for JSON serialization
    for movie in movies:
        movie['_id'] = str(movie['_id'])  # Convert ObjectId to string
    
    if movies:
        return jsonify(movies), 200  # Return the movies as JSON
    else:
        return jsonify({"message": "No movies found"}), 404


@main_routes.route('/kids', methods=['GET'])
@jwt_required()
def get_kid_shows():
    # Fetch kid shows from the kids collection
    kids_show = list(db.kids_show.find({}))
    
    for kid in kids_show:
        kid['_id'] = str(kid['_id'])
    
    if kids_show:
        return jsonify(kids_show), 200
    else:
        return jsonify({"message": "No kids show found"}), 404
    
@main_routes.route('/series', methods=['GET'])
@jwt_required()
def get_webseries():
    # Fetch series from the series collection
    web_series = list(db.web_series.find({}))
    
    for web in web_series:
        web['_id'] = str(web['_id'])
    
    if web_series:
        return jsonify(web_series), 200
    else:
        return jsonify({"message": "No web series found"}), 404
    
@voting_routes.route('/submit-vote', methods=['POST'])
def submit_vote():
    try:
        data = request.get_json()
        movie_id = data.get('movieId')
        rating = data.get('rating')
        comment = data.get('comment')
        current_user = 'Anonymous'
        # Existing update logic
        collections = [
            db.movies,
            db.web_series, 
            db.kids_show
        ]

        for collection in collections:
            result = collection.update_one(
                {'_id': ObjectId(movie_id)},
                {
                    '$inc': {'votes': 1},
                    '$push': {
                        'reviews': {
                            'user': current_user,
                            'rating': rating,
                            'comment': comment
                        }
                    }
                }
            )

            if result.modified_count > 0:
                # Use current_app's socketio if available
                from flask import current_app
                socketio = current_app.extensions['socketio']
                
                socketio.emit('vote_update', {
                    'success': True, 
                    'movieId': movie_id,
                    'votes': result.modified_count
                })
                
                return jsonify({
                    'success': True, 
                    'message': 'Vote submitted successfully'
                }), 200

        return jsonify({
            'success': False, 
            'message': 'Movie not found'
        }), 404

    except Exception as e:
        return jsonify({
            'success': False, 
            'message': str(e)
        }), 500