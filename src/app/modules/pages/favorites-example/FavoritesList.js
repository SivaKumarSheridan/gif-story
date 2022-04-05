import React from "react";
import FavoriteItem from "./FavoriteItem";

export default function FavoritesList(){

const arrayList =[
    {
        id:1,
        name:"test1"
    },
    {
        id:2,
        name:"test2"
    },
    {
        id:3,
        name:"test3"
    }
]

    return(
        <>
        
<br></br>
<h1>Favorites</h1>
{   
    arrayList.map((item)=>{
       return (<FavoriteItem data={item} />);
    })
}
        </>
    );
}