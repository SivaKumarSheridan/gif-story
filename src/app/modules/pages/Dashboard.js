import React from "react";
import { FaHatCowboy } from "react-icons/fa";
import Banner from "./banner/Banner";
import Instruction from "./instruction/Instruction";
import Intro from "./intro/Intro";
import Joke from "./joke/Joke";
// import Quote from "./quote/Quote";
// import QuoteButton from "./quote/QuoteButton";

export default function Dashboard() {
  return (
    <>
      <div>
        Hello From Dashboard <FaHatCowboy />
        <Intro />
        <Instruction />
        <Joke />
        <Banner />
        {/* <Quote />
        <QuoteButton /> */}
      </div>
    </>
  );
}
