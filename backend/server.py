from flask import Flask, request, jsonify
from bson import json_util
import datetime
import collab_filtering
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from pymongo.server_api import ServerApi

load_dotenv()

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)

MONGODB_URI = os.getenv("MONGODB_URI")
client = MongoClient(MONGODB_URI, server_api=ServerApi('1'))

users = client['movieRecommendation']['user']
movies = client['movieRecommendation']['movies']

@app.route('/rating/<string:username>', methods=['PUT'])
def get_recommendation(username):
    data = request.get_json()
    rating = data.get('rating', {})
    result = users.update_one({ "username": username }, { "$set": { "rating": rating } })
    user = users.find_one({ "username": username })
    return collab_filtering.movie_recommandation(user['rating'])

@app.route('/info', methods=['POST'])
def get_info():
    data = request.get_json()
    movieTitle = data.get('title', {})
    movieObj = movies.find_one({"title": movieTitle})
    return json_util.dumps(movieObj)

@app.route('/user/<string:username>/<string:password>', methods=['POST'])
def get_user(username, password):
    user = users.find_one({ "username": username })
    if user is not None and user.get("password") == password:
        return jsonify({"username": user["username"], "rating": user.get("rating", {})})
    elif user is None:
        user = { "username": username, "password": password, "rating": {} }
        users.insert_one(user)
        return jsonify({"username": username, "rating": {}})
    else:
        return jsonify({}), 401

@app.route('/user/<string:username>', methods=['GET'])
def get_user_info(username):
    user = users.find_one({ "username": username })
    if user is not None:
        return jsonify({"username": user["username"], "rating": user.get("rating", {})})
    else:
        return jsonify({}), 404

@app.route('/trending')
def get_trending():
    return collab_filtering.trending()

@app.route('/movies')
def get_movies():
    return collab_filtering.all_movie()

    
# Running app
if __name__ == '__main__':
    app.run(debug=True)