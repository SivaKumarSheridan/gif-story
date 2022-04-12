import React from "react";
import {Container} from 'react-bootstrap'
import "./AboutUs.css"

export default function AboutUs() {

    return(<>
    <div className="full-page-container about-us">
        <Container>
            <h1 className="about-us-title">About Us</h1>
            <p>We created a place for creative pros to beautifully and easily 
                show off their work, We call it GIF STORY. </p>
                <p>GIF STORY is much more than creating gifs. 
                    It's a start-to-finish gif maker giving creative professionals, 
                    businesses and organizations everything they need to make and market 
                    amazing, impactful gifs. Start with generating a random quote and use that 
                    to get gifs and make ypur own gif story by selecting the images or videos 
                    of your choice.</p>
        </Container>
    </div>
    </>);
}