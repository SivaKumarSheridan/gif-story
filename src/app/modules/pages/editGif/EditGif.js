import React, { useEffect, useState } from "react";
import GifMaker from "../gif-maker/GifMaker";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import queryString from "query-string";
import firebase from "../../../firebase/firebase";

export default function EditGif(props){
    const searchLocation = props.location.search;
    const { memeId } = queryString.parse(
      searchLocation
    );
    const [memeDetails, setMemeDetails]=useState({});    
    useEffect(()=>{
        firebase.retrieveMemeDetailsById(memeId).then(response => setMemeDetails(response))
    }, []);

    return(<>
    <DndProvider backend={HTML5Backend}>
    <GifMaker memeDetail={memeDetails}/>
    </DndProvider>
    </>)
}