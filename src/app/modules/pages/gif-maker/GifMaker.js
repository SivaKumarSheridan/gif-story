import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./GifMaker.css";
import { GiphyFetch } from "@giphy/js-fetch-api";
import MainBoard from "./MainBoard";
import DropBoard from "./DropBoard";
import defaultImage from "../../../assets/default.png";

export default function GifMaker() {
  const memeDetails = {
    image1: "",
    image2: "",
    image3: "",
    quotes: "",
    creationDate: new Date().getTime(),
  };

  const giphy = new GiphyFetch("KN85AKZvPoWj10aofG7zkn5ZKEiXaZGC");
  const [gifList, setGifList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [boardImage1, setBoardImage1] = useState("");
  const [boardImage2, setBoardImage2] = useState("");
  const [boardImage3, setBoardImage3] = useState("");
  const [quotes, setQuotes] = useState("");
  const [board, setBoard] = useState([
    {
      id: 1,
      url: defaultImage,
    },
    {
      id: 2,
      url: defaultImage,
    },
    {
      id: 3,
      url: defaultImage,
    },
  ]);

  useEffect(() => {
    getTrendingList();
  }, []);

  async function getTrendingList() {
    giphy.trending({ limit: 15 }).then((response) => {
      setGifList(response.data);
    });
  }

  async function getGifList() {
    if (searchText.length <= 0) {
      giphy.trending({ limit: 15 }).then((response) => {
        setGifList(response.data);
      });
      return;
    }
    giphy.search(searchText, { limit: 20 }).then((response) => {
      setGifList(response.data);
    });
  }

  const handleBoadUpdated = (id, gifDetails) => {
    if (id === 1) {
      setBoardImage1(gifDetails.images.original.url);
    } else if (id === 2) {
      setBoardImage2(gifDetails.images.original.url);
    } else {
      setBoardImage3(gifDetails.images.original.url);
    }
  };

  const handleQuotesChange = (e) => {
    setQuotes(e.target.value);
  };

  const saveMeme = () => {
    memeDetails.image1 = boardImage1;
    memeDetails.image2 = boardImage2;
    memeDetails.image3 = boardImage3;
    memeDetails.quotes = quotes;
    memeDetails.creationDate = new Date().getTime();
    console.log(memeDetails);
  };

  return (
    <>
      <div className="gif-body">
        <Container>
          <h1>Gif Story Maker</h1>
          <div className="gif-main">
            <Row className="gif-row">
              {board.map((item) => {
                return (
                  <DropBoard
                    id={item.id}
                    handleBoadUpdated={handleBoadUpdated}
                    url={item.url}
                  />
                );
              })}
            </Row>
            <div className="quotes-div">
              <input
                onChange={handleQuotesChange}
                type="text"
                placeholder="Enter/paste your Quote...."
              />
            </div>
            <div className="d-flex justify-content-center">
              <div onClick={saveMeme} className="default-btn meme-btn">
                SAVE MEME
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="gif-list">
        <Container>
          <div className="search">
            <input
              type="search"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for gif..."
            />
            <button type="button" onClick={getGifList}>
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <br />

          <Row lg={5}>
            {gifList.map((gif) => {
              return (
                <Col>
                  <div className="gif-list-img">
                    <MainBoard
                      id={gif.id}
                      gifDetails={gif}
                      url={gif.images.original.url}
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
}
