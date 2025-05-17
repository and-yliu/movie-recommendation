import React, {useEffect, useState} from "react";
import "./App.css";
import Header from "./component/Header";
import Recommendation from "./component/Recommendation";
import RatingList from "./component/RatingList";
import User from "./component/User";

function App() {
    const [dataset, setDataset] = useState([]);
    const [user, setUser] = useState("");
    const [movies, setMovies] = useState([]);
    const [ratings, setRatings] = useState({});
    const [trendList, setTrendList] = useState([]);
    const [movielist, setMovielist] = useState(getDefaultMovieList());
    const [loadingUser, setLoadingUser] = useState(false);

    function getDefaultMovieList() {
      return [
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
        }];
    }

    function getMovieInfo(titles, setList) {
      const list = [];
      titles.forEach((movieTitle) => {
        const movie = dataset.find((m) => m.title === movieTitle);
        if (movie) list.push(movie);
      });
      setList(list);
    }

    useEffect(() => {
      fetch("/movies.json")
        .then((res) => res.json())
        .then(setDataset)
        .catch((err) => console.error("Failed to load movie list", err));
    }, []);

    useEffect(() => {
      if (dataset.length === 0) return;
      fetch("/trending")
        .then((res) => res.json())
        .then((data) => getMovieInfo(data, setTrendList));
      fetch("/movies")
        .then((res) => res.json())
        .then((data) => getMovieInfo(data, setMovies));
    }, [dataset]);

    useEffect(() => {
      if (!user) {
        setRatings({});
        setMovielist(getDefaultMovieList());
        return;
      }
      setLoadingUser(true);
      fetch(`/user/${user}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.username) {
            setRatings(data.rating || {});
          } else {
            setRatings({});
            setMovielist(getDefaultMovieList());
          }
        })
        .finally(() => setLoadingUser(false));
    }, [user, dataset]);

    useEffect(() => {
      if (!user || Object.keys(ratings).length === 0 || loadingUser) return;
      fetch(`/rating/${user}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: ratings }),
      })
        .then((res) => res.json())
        .then((recs) => getMovieInfo(recs, setMovielist));
    }, [ratings, user, dataset, loadingUser]);

    return (
      <>
        {user === "" ? (
          <div className="h-screen flex items-center justify-center">
            <User setUser={setUser} />
          </div>
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
            <Header
              movies={movies}
              ratings={ratings}
              setRatings={setRatings}
              setUser={setUser}
            />
            <RatingList ratings={ratings} setRatings={setRatings} />
            <main className="max-w-7xl mx-auto px-4 mt-10">
              <Recommendation trendList={trendList} movielist={movielist} />
            </main>
          </div>
        )}
      </>
    );
}

export default App;
