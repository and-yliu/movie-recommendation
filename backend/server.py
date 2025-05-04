from flask import Flask, request
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

collection = client['movieRecommendation']['user']


# Route for seeing a data
@app.route('/rating/<int:userID>', methods=['PUT'])
def get_recommendation(userID):
    data = request.get_json();
    rating = data.get('rating', {})
    result = collection.update_one({ "userId": userID }, { "$set": { "rating": rating } })
    user = collection.find_one({ "userId": userID })
    return collab_filtering.movie_recommandation(user['rating'])

    
# Running app
if __name__ == '__main__':
    app.run(debug=True)