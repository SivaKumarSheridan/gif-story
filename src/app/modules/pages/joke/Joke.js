import React, { useState, useEffect } from "react";

const API_URL = "http://api.icndb.com/jokes/random";

const Joke = () => {
  const [joke, setJoke] = useState("");

  const generateJoke = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setJoke(data.value.joke));
  };

  useEffect(() => {
    generateJoke();
  }, []);

  return (
    <div className="box">
      <h1>Chuck Norris Jokes Generator</h1>
      <p dangerouslySetInnerHTML={{ __html: joke }} />
      <button onClick={generateJoke}>Get new joke 🤣</button>
    </div>
  );
};

export default Joke;
