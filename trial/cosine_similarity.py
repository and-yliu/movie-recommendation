from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

text = ["London Paris London", "Paris Paris London"]
vectorizer = CountVectorizer()

count_matrix = vectorizer.fit_transform(text)
similarity = cosine_similarity(count_matrix)

print(count_matrix.toarray())
print(similarity)