import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

rating = pd.read_csv("../dataset/toy_dataset.csv", index_col=0)
rating.fillna(0, inplace=True)

def standardize(row):
	new = (row - row.mean()) / (row.max() - row.min())
	return new

std_rating = rating.apply(standardize, axis=1)
similarity = cosine_similarity(std_rating.T)
df = pd.DataFrame(similarity, index=std_rating.columns, columns=std_rating.columns)


def get_similar_movie(movie_name, user_rating):
	similarity_score = df[movie_name] * (user_rating-2.5)
	similarity_score.sort_values(ascending = False, inplace = True)
	return similarity_score


action_user = [("action1", 5), ("romantic1", 1), ("romantic2", 1)]
similar_movie = pd.DataFrame()

for(movie, rating) in action_user:
	similar_movie = pd.concat([similar_movie, pd.DataFrame(get_similar_movie(movie, rating)).T], ignore_index=True)

suggested = similar_movie.sum().sort_values(ascending = False)

print(suggested)