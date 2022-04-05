import React from "react";

export default function FavoriteItem({ data }) {
  return (
    <>
      <h2>{data.id}</h2>
      <h2>{data.createdDate}</h2>
      <h2>{data.quote}</h2>
      <img src={data.img1} alt="" />
      <img src={data.img2} alt="" />
      <img src={data.img3} alt="" />
      <h2>{data.isFav}</h2>
    </>
  );
}
