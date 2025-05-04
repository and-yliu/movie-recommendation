import React, {useState, useEffect} from 'react'
import MovieCard from './MovieCard'

const Recommendation = (props) => {

    const movielist = [
        {
          "movieId": 1,
          "title": "Toy Story (1995)",
          "genres": "Adventure|Animation|Children|Comedy|Fantasy",
          "poster": "True"
        },
        {
          "movieId": 2,
          "title": "Jumanji (1995)",
          "genres": "Adventure|Children|Fantasy",
          "poster": "True"
        },
        {
          "movieId": 3,
          "title": "Grumpier Old Men (1995)",
          "genres": "Comedy|Romance",
          "poster": "True"
        },
        {
          "movieId": 4,
          "title": "Waiting to Exhale (1995)",
          "genres": "Comedy|Drama|Romance",
          "poster": "True"
        },
        {
          "movieId": 5,
          "title": "Father of the Bride Part II (1995)",
          "genres": "Comedy",
          "poster": "True"
        },
        {
          "movieId": 6,
          "title": "Heat (1995)",
          "genres": "Action|Crime|Thriller",
          "poster": "True"
        },
        {
          "movieId": 7,
          "title": "Sabrina (1995)",
          "genres": "Comedy|Romance",
          "poster": "True"
        },
        {
          "movieId": 8,
          "title": "Tom and Huck (1995)",
          "genres": "Adventure|Children",
          "poster": "True"
        },
        {
          "movieId": 9,
          "title": "Sudden Death (1995)",
          "genres": "Action",
          "poster": "True"
        },
        {
          "movieId": 10,
          "title": "GoldenEye (1995)",
          "genres": "Action|Adventure|Thriller",
          "poster": "True"
        }]

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Recommendations For You
            </h1>
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {movielist.map((movie) => (
                        <MovieCard
                            key={movie['movieId']}
                            title={movie['title']}
                            genres={movie['genres']}
                            movieId={movie['movieId']}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Recommendation