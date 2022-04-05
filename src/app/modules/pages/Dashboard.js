import React from "react";
import { FaHatCowboy } from "react-icons/fa";
import Joke from "./joke/Joke";
// import Quote from "./quote/Quote";
// import QuoteButton from "./quote/QuoteButton";

export default function Dashboard() {
  return (
    <>
      <div>
        Hello From Dashboard <FaHatCowboy />
        <Joke />
        {/* <Quote />
        <QuoteButton /> */}
      </div>
    </>
  );
}
