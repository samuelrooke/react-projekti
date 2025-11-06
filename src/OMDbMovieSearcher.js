import React, { useState } from "react";

export default function OMDbMovieSearcher() {
  const [text, setText] = useState("moro");

  return (
    
    <div>
      <p>{text}</p>
      <form onSubmit={e => {
        
        (async () => {
          e.preventDefault();

          const rawResponse = await fetch(
          "http://www.omdbapi.com/?t=" + e.target[0].value + "&apikey=980ebb83",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ a: 1, b: "Textual content" }),
            },
          );
          const content = await rawResponse.json();

          setText(JSON.stringify(content));
        })();
      }}>
        <input />
      </form>
    </div>
  );
}
