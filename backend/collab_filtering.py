import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_DIR = os.path.join(BASE_DIR, '../dataset')

def get_rating_table():
	ratings = pd.read_csv(os.path.join(DATASET_DIR, "ratings.csv"))
	movies = pd.read_csv(os.path.join(DATASET_DIR, "movies.csv"))

	merged = pd.merge(movies, ratings).drop(["genres", "timestamp"], axis=1)

	rating_table = merged.pivot(columns="movieId", index="userId", values="rating")
	rating_table.dropna(axis=1, thresh=10, inplace=True)
	rating_table.fillna(0, inplace=True)

	return rating_table


def all_movie():
	movies = pd.read_csv(os.path.join(DATASET_DIR, "movies.csv"))

	rating_table = get_rating_table()
	filtered_movies = rating_table.sum(axis=0)

	movie_df = filtered_movies.reset_index()
	movie_df.columns = ['movieId', 'score']

	all_movies = []
	for movieId in movie_df["movieId"]:
		all_movies.append(movies[movies.movieId == movieId]["title"].values[0])
	print(all_movies)
	return all_movies

def trending():
	movies = pd.read_csv(os.path.join(DATASET_DIR, "movies.csv"))

	rating_table = get_rating_table()

	trend = rating_table.sum(axis=0).sort_values(ascending = False)

	trend_df = trend.reset_index()
	trend_df.columns = ['movieId', 'score']

	movie_trend = []
	i = 0
	for movieId in trend_df["movieId"]:
		movie_trend.append(movies[movies.movieId == movieId]["title"].values[0])
		i=i+1
		if(i >= 8):
			break
	return movie_trend



def collab_filtering(user):
	movies = pd.read_csv(os.path.join(DATASET_DIR, "movies.csv"))

	rating_table = get_rating_table()

	similarity_df = rating_table.corr(method="pearson")
	similar_movies = pd.DataFrame()

	def get_similar_movie(movie_title, user_rating):
		movie_id = movies[movies.title == movie_title]["movieId"].values[0]
		similarity_score = similarity_df[movie_id] * (user_rating-2.5)
		similarity_score.sort_values(ascending = False, inplace = True)
		return similarity_score

	for movie_name, rating in user.items():
		row = get_similar_movie(movie_name, rating)
		similar_movies = similar_movies._append(row, ignore_index=True)

	similar_movies = similar_movies.sum().sort_values(ascending = False)

	similar_movies_df = similar_movies.reset_index()
	similar_movies_df.columns = ['movieId', 'score']

	similar_movies_with_titles = pd.merge(similar_movies_df, movies[['movieId', 'title']], on='movieId', how='left')

	return similar_movies_with_titles

def movie_seen(movie, user):
	for movie_name, rating in user.items():
		if movie_name == movie:
			return True
	return False

def movie_recommandation(user):
	movies_df = collab_filtering(user)
	movies = movies_df["title"]

	movies_unseen = []
	for movie in movies:
		if not movie_seen(movie, user):
			movies_unseen.append(movie)

	if len(movies_unseen) > 12:
		movies_unseen = movies_unseen[0:12]      
	
	return movies_unseen
