import React from "react";

export default function FavoriteItem({data}){

    return(
        <>
        <h2>{data.id}</h2>
        <h2>{data.name}</h2>
        </>
    );
}