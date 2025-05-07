import React, {useState} from "react";

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
      <header className="bg-gradient-to-r from-blue-600 to-purple-500 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">Movie Recommendation</div>
        </nav>
      </header>
      <div className="bg-white/80 py-8 rounded-b-2xl shadow-md">
        <div className="max-w-3xl mx-auto px-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
          />
          <ul className="mt-4 space-y-2 text-gray-700">
            {filtered.slice(0,10).map((movie, index) => (
              <li
                key={index}
                className="bg-white px-4 py-3 border rounded shadow-sm hover:bg-blue-50 transition"
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
    </>
  )
}

export default Header