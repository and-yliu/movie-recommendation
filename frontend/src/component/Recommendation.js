import React from 'react'
import MovieCard from './MovieCard'

const Recommendation = (props) => {

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8 drop-shadow">
                Recommendations For You
            </h1>
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {props.movielist.map((movie) => (
                        <MovieCard
                            key={movie['movieId']}
                            title={movie['title']}
                            genres={movie['genres']}
                            movieId={movie['movieId']}
                        />
                    ))}
                </div>
            </div>
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8 mt-10 drop-shadow">
                Most Watched
            </h1>
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {props.trendList.map((movie) => (
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