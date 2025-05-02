import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def get_title_from_index(index):
	return df[df.index == index]["title"].values[0]

def get_index_from_title(title):
	return df[df.title == title]["index"].values[0]


df = pd.read_csv("dataset/content_based_dataset.csv")
features = ['keywords', 'cast', 'genres', 'director', 'original_language']

for feature in features:
	df[feature] = df[feature].fillna('')

def combine_features(row):
	return row['keywords'] + " " + row['cast'] + " " + row['genres'] + " " + row['director'] + " " + row['original_language']

df["features"] = df.apply(combine_features, axis=1)

vectorizer = CountVectorizer()

count_matrix = vectorizer.fit_transform(df["features"])
similarity = cosine_similarity(count_matrix)

movie_liked = "Avatar"
movie_index = get_index_from_title(movie_liked)
similarity_score = similarity[movie_index]

sorted_list = sorted(enumerate(similarity_score), key=lambda x: x[1], reverse=True)

i = 0
for movie in sorted_list:
	print(get_title_from_index(movie[0]))
	i=i+1
	if i > 50:
		break

