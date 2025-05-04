import React, { useState, useEffect } from "react";

const Header = (props) => {
  const [query, setQuery] = useState("");


  const filtered = query.length === 0 ? [] : props.movies.filter((movie) =>
      movie["title"].toLowerCase().startsWith(query.toLowerCase())
  );

  const handleRating = (title, rating) => {
    props.setRatings((prev) => ({
      ...prev,
      [title]: rating,
    }));
  };

  const handleCancel = (title) =>{
    props.setRatings((prev) => {
      const { [title]: _, ...prevRating } = prev;
      return prevRating;
    });
  };

  const renderStars = (title) => {
    const currentRating = props.ratings[title] || 0;
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(title, star)}
            className={star <= currentRating ? "text-yellow-400" : "text-gray-300"}
          >
            ★
          </button>
        ))}
      </div>
    );
  };


  return (
    <>
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Movie Recommendation</div>
        </nav>
      </header>
      <div className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ul className="mt-4 space-y-2 text-gray-700">
            {filtered.slice(0,10).map((movie, index) => (
              <li
                key={index}
                className="bg-white px-4 py-2 border rounded shadow-sm hover:bg-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <span className="text-lg font-medium">{movie["title"]}</span>
                  {renderStars(movie["title"])}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {Object.keys(props.ratings).map((key) => (
        <button
          key={key}
          className="inline-flex items-center px-3 py-1 m-1 bg-blue-100 text-blue-700 rounded-full border border-blue-300 hover:bg-blue-200 transition-colors"
          type="button"
        >
          <span className="mr-2">{key}</span>
          <span className="font-semibold text-yellow-500">{'★'.repeat(props.ratings[key])}</span>
          <span
            className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer"
            onClick={() => handleCancel(key)}
            role="button"
            aria-label={`Remove rating for ${key}`}
          >
            &times;
          </span>
        </button>
      ))}
    </>
  )
}

export default Header