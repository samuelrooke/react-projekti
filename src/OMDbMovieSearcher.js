import React, { useState } from "react";

export default function OMDbMovieSearcher() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");  // movie title
  const [year, setYear] = useState("");    // movie year
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = async (e) => {
    e.preventDefault();
    // Don’t allow completely empty searches
    if (!query.trim() && !year.trim()) {
      setError("Please enter a title or a year.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build query string dynamically
      let url = `https://www.omdbapi.com/?apikey=980ebb83`;

      if (query.trim()) url += `&s=${encodeURIComponent(query)}`;
      if (year.trim()) url += `&y=${encodeURIComponent(year)}`;

      const response = await fetch(url);
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

      <form onSubmit={searchMovies} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Enter movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-3 py-2 rounded w-3/4"
        />

        <input
          type="text"
          placeholder="Enter year (optional)..."
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border px-3 py-2 rounded w-3/4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        <button
          type="button"
          onClick={() => {
          setMovies([]);
          setQuery("");
          setYear("");
          setError(null);
         }}
          className="ml-2 bg-gray-300 text-black px-3 py-2 rounded hover:bg-gray-400"
>
  Clear
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
