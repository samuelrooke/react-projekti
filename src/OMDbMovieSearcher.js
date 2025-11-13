import React, { useState } from "react";

export default function OMDbMovieSearcher() {

  const [movies, setMovies] = useState([]);  // Hakuparametrit
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //async funktio joka etsii elokuvat ja jos ei palauta arvoja antaa virheilmoituksen
  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=980ebb83`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No results found.");
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch data.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-semibold mb-3">OMDb Movie Search</h1>

      <form onSubmit={searchMovies} className="mb-4">
        <input
          type="text"
          placeholder="Enter movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-3 py-2 rounded w-3/4"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="border rounded p-2 shadow-sm flex flex-col items-center"
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150?text=No+Image"
              }
              alt={movie.Title}
              className="w-32 h-48 object-cover mb-2"
            />
            <p className="font-semibold">{movie.Title}</p>
            <p className="text-gray-600">{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
