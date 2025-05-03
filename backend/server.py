from flask import Flask
import datetime
import collab_filtering

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)


# Route for seeing a data
@app.route('/data')
def get_time():
    fake_user = [("2 Fast 2 Furious (Fast and the Furious 2, The) (2003)", 5), ("12 Years a Slave (2013)", 4),
			("2012 (2009)", 3), ("(500) Days of Summer (2009)", 2)]
    # Returning an api for showing in  reactjs
    return collab_filtering.movie_recommandation(fake_user)

    
# Running app
if __name__ == '__main__':
    app.run(debug=True)