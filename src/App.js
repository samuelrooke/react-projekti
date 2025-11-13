// App.js — React-versio OMDb Movie Searcherille
import React from "react";
import OMDbMovieSearcher from "./OMDbMovieSearcher";
import "./App.css"; // lisää omat tyylit tai Tailwind

// Tämä on sovelluksen pääkomponentti
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-900 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Movie Searcher</h1>
      <OMDbMovieSearcher apiKey={process.env.REACT_APP_OMDB_API_KEY} />
    </div>
  );
}




export default App;
