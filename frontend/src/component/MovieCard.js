import React from 'react'

const MovieCard = (props) => {
    const poster = "/posters/" + props.movieId + ".jpg"

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-60 m-4 flex flex-col items-center">
            <img
                src={poster}
                alt={props.title}
                className="w-full h-80 object-cover"
            />
            <div className="p-4 w-full flex flex-col items-center">
                <p
                  className="text-lg font-semibold text-gray-800 text-center truncate max-w-[13rem]"
                  title={props.title}
                >
                  {props.title}
                </p>
                <p
                  className="text-sm text-gray-500 text-center mt-1 truncate max-w-[13rem]"
                  title={props.genres}
                >
                  {props.genres}
                </p>
            </div>
        </div>
    )
}

export default MovieCard