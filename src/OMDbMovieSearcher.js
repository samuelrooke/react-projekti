import React, { useState } from "react";

export default function OMDbMovieSearcher() {
  const [text, setText] = useState("moro");

  return (
    <div>
      <p>{text}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          (async () => {
            const movieTitle = e.target[0].value;
            const response = await fetch(
              `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=980ebb83`
            );
            const data = await response.json();
            setText(JSON.stringify(data, null, 2));
            
          })();
        }}
      >
        <input placeholder="input" />
      </form>
    </div>
  );
}
