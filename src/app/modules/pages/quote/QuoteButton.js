import React, { useState, useEffect } from "react";
import classes from "./Quote.module.css";

const QuoteButton = () => {
  const [quote, setQuote] = useState({
    anime: null,
    character: null,
    quote: null,
  });

  const fetchQuote = async () => {
    return await fetch("https://animechan.vercel.app/api/random").then(
      (response) => response.json()
    );
  };

  const generate = async () => {
    setQuote(await fetchQuote());
  };

  useEffect(async () => {
    setQuote(await fetchQuote());
  }, []);

  return <button onClick={generate}>Generate new quote</button>;
};

export default QuoteButton;
