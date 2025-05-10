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

# Route for seeing a data
@app.route('/rating/<int:userID>', methods=['PUT'])
def get_recommendation(userID):
    data = request.get_json()
    rating = data.get('rating', {})
    result = users.update_one({ "userId": userID }, { "$set": { "rating": rating } })
    user = users.find_one({ "userId": userID })
    return collab_filtering.movie_recommandation(user['rating'])

@app.route('/info', methods=['POST'])
def get_info():
    data = request.get_json()
    movieTitle = data.get('title', {})
    movieObj = movies.find_one({"title": movieTitle})
    return json_util.dumps(movieObj)

@app.route('/trending')
def get_trending():
    return collab_filtering.trending()

@app.route('/movies')
def get_movies():
    return collab_filtering.all_movie()

    
# Running app
if __name__ == '__main__':
    app.run(debug=True)