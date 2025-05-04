import React, {useEffect, useState} from "react";
import "./App.css";
import Header from "./component/Header";
import Recommendation from "./component/Recommendation";

function App() {
    const [movies, setMovies] = useState([]);
    const [ratings, setRatings] = useState({});
    const [movielist, setMovielist] = useState([
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
      }]);

    useEffect(() => {
      fetch("/movies.json")
        .then((res) => res.json())
        .then((data) => setMovies(data))
        .catch((err) => console.error("Failed to load movie list", err));
    }, []);

    // Using useEffect for single rendering
    useEffect(() => {
        if (Object.keys(ratings).length === 0) return;
        fetch('/rating/1',{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({rating: ratings})
        }).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                const recommendation = [];
                data.forEach((movieTitle) =>{
                  const moive = movies.find(m => m.title === movieTitle);
                  recommendation.push(moive);
                })
                setMovielist(recommendation);
            })
        );
    }, [ratings]);

    return (
        <>
            <Header movies={movies} ratings={ratings} setRatings={setRatings}/>
            <Recommendation movielist={movielist}/>
        </>
    );
}

export default App;
