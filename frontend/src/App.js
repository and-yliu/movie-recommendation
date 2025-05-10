import React, {useEffect, useState} from "react";
import "./App.css";
import Header from "./component/Header";
import Recommendation from "./component/Recommendation";
import RatingList from "./component/RatingList";

function App() {
    const [dataset, setDataset] = useState([]);
    const [movies, setMovies] = useState([]);
    const [ratings, setRatings] = useState({});
    const [trendList, setTrendList] = useState([]);
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
      },
      {
        "movieId": 11,
        "title": "American President, The (1995)",
        "genres": "Comedy|Drama|Romance",
        "poster": "True"
      },
      {
        "movieId": 12,
        "title": "Dracula: Dead and Loving It (1995)",
        "genres": "Comedy|Horror",
        "poster": "True"
      }]);

    useEffect(() => {
      fetch("/movies.json")
        .then((res) => res.json())
        .then((data) => setDataset(data))
        .catch((err) => console.error("Failed to load movie list", err));
    }, []);

    function getMovieInfo(data, func){
      const list = [];
      data.forEach((movieTitle) =>{
        const movie = dataset.find(m => m.title === movieTitle);
        if (movie) list.push(movie);
      })
      func(list);
    }

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
                getMovieInfo(data, setMovielist);
            })
        );
    }, [ratings, dataset]);

    useEffect(() => {
      fetch('/trending').then((res) => {
        res.json().then((data) => {
          getMovieInfo(data, setTrendList);
        });
      });
    }, [dataset]);

    useEffect(() => {
      fetch('/movies').then((res) => {
        res.json().then((data) => {
          getMovieInfo(data, setMovies);
        });
      });
    }, [dataset]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
            <Header movies={movies} ratings={ratings} setRatings={setRatings}/>
            <RatingList ratings={ratings} setRatings={setRatings} />
            <main className="max-w-7xl mx-auto px-4 mt-10">
                <Recommendation trendList={trendList} movielist={movielist}/>
            </main>
        </div>
    );
}

export default App;
