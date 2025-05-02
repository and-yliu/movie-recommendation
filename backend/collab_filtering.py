import pandas as pd

ratings = pd.read_csv("dataset/ratings.csv")
movies = pd.read_csv("dataset/movies.csv")

merged = pd.merge(movies, ratings).drop(["genres", "timestamp"], axis=1)
print(merged.head())

rating_table = merged.pivot(columns="movieId", index="userId", values="rating")
rating_table.dropna(axis=1, thresh=10, inplace=True)
rating_table.fillna(0, inplace=True)


similarity_df = rating_table.corr(method="pearson")

def get_similar_movie(movie_title, user_rating):
	movie_id = movies[movies.title == movie_title]["movieId"].values[0]
	similarity_score = similarity_df[movie_id] * (user_rating-2.5)
	similarity_score.sort_values(ascending = False, inplace = True)
	return similarity_score

fake_user = [("2 Fast 2 Furious (Fast and the Furious 2, The) (2003)", 5), ("12 Years a Slave (2013)", 4),
			 ("2012 (2009)", 3), ("(500) Days of Summer (2009)", 2)]

similar_movies = pd.DataFrame();

for(movie_name, rating) in fake_user:
	row = get_similar_movie(movie_name, rating)
	similar_movies = similar_movies._append(row, ignore_index=True)

similar_movies = similar_movies.sum().sort_values(ascending = False)

similar_movies_df = similar_movies.reset_index()
similar_movies_df.columns = ['movieId', 'score']

similar_movies_with_titles = pd.merge(similar_movies_df, movies[['movieId', 'title']], on='movieId', how='left')

print(similar_movies_with_titles)
