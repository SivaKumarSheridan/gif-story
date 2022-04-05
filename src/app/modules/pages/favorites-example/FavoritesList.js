import React from "react";
import FavoriteItem from "./FavoriteItem";

export default function FavoritesList() {
  const arrayList = [
    {
      id: 1,
      createdDate: "04-05-2022",
      quote: "Never Gonna Give You Up",
      img1: "https://media.giphy.com/media/aECVcAuxVPluABf0d0/giphy.gif",
      img2: "https://media.giphy.com/media/ZpO6lCz6tbSCXn6nXq/giphy.gif",
      img3: "https://media.giphy.com/media/9gIJLP6QZFbVzPmLU9/giphy.gif",
      isFav: true,
    },
    {
      id: 2,
      createdDate: "04-04-2022",
      quote: "Since You've Been Gone",
      img1: "https://media.giphy.com/media/aECVcAuxVPluABf0d0/giphy.gif",
      img2: "https://media.giphy.com/media/ZpO6lCz6tbSCXn6nXq/giphy.gif",
      img3: "https://media.giphy.com/media/9gIJLP6QZFbVzPmLU9/giphy.gif",
      isFav: true,
    },
    {
      id: 3,
      createdDate: "04-02-2022",
      quote: "Do You Believe in Love After Love",
      img1: "https://media.giphy.com/media/aECVcAuxVPluABf0d0/giphy.gif",
      img2: "https://media.giphy.com/media/ZpO6lCz6tbSCXn6nXq/giphy.gif",
      img3: "https://media.giphy.com/media/9gIJLP6QZFbVzPmLU9/giphy.gif",
      isFav: false,
    },
  ];

  return (
    <>
      <br></br>
      <h1>Favorites</h1>
      {arrayList.map((item) => {
        return <FavoriteItem data={item} />;
      })}
    </>
  );
}
