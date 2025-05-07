import React from "react";

const RatingList = ({ ratings, setRatings }) => {
  return (
    <section className="max-w-5xl mx-auto px-4 mt-6">
      {Object.keys(ratings).length > 0 && (
        <div className="bg-white/90 rounded-xl shadow p-4">
          <h2 className="text-xl font-bold text-gray-700 mb-3 text-center">Your Ratings</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.keys(ratings).map((key) => (
              <button
                key={key}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full border border-blue-300 hover:bg-blue-200 transition-colors shadow"
                type="button"
                tabIndex={-1}
              >
                <span className="mr-2 font-semibold">{key}</span>
                <span className="font-semibold text-yellow-500">{'★'.repeat(ratings[key])}</span>
                <span
                  className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer"
                  onClick={() => setRatings(prev => {
                    const { [key]: _, ...rest } = prev;
                    return rest;
                  })}
                  tabIndex={0}
                  role="button"
                  aria-label={`Remove rating for ${key}`}
                >
                  &times;
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default RatingList; 