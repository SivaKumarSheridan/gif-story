import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./GifMaker.css";
import { GiphyFetch } from "@giphy/js-fetch-api";
import MainBoard from "./MainBoard";
import DropBoard from "./DropBoard";
import defaultImage from "../../../assets/default.png";
import firebase from "../../../firebase/firebase";

export default function GifMaker({ memeDetail }) {
  const [isEdit, setIsEdit] = useState(memeDetail ? true : false);
  const [memeDetails, setMemeDetails] = useState({
    memeId: memeDetail ? memeDetail.memeId : "",
    image1: memeDetail ? memeDetail.image1 : defaultImage,
    image2: memeDetail ? memeDetail.image2 : defaultImage,
    image3: memeDetail ? memeDetail.image3 : defaultImage,
    quotes: memeDetail ? memeDetail.quotes : "",
    creationDate: new Date().getTime(),
    isFavorite: memeDetail ? memeDetail.isFavorite : false,
  });
  const history = useHistory();
  const giphy = new GiphyFetch("KN85AKZvPoWj10aofG7zkn5ZKEiXaZGC");
  const [gifList, setGifList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [boardImage1, setBoardImage1] = useState(memeDetails.image1);
  const [boardImage2, setBoardImage2] = useState(memeDetails.image2);
  const [boardImage3, setBoardImage3] = useState(memeDetails.image3);
  const [quotes, setQuotes] = useState(memeDetails.quotes);
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

  async function generateQuote() {
    try {
      fetch("https://api.quotable.io/random")
        .then((response) => response.json())
        .then((data) => {
          setQuotes(data.content);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrendingList();
  }, []);

  useEffect(() => {
    //update state variables
    setBoard([
      {
        id: 1,
        url: memeDetail?.image1 ? memeDetail.image1 : defaultImage,
      },
      {
        id: 2,
        url: memeDetail?.image2 ? memeDetail.image2 : defaultImage,
      },
      {
        id: 3,
        url: memeDetail?.image3 ? memeDetail.image3 : defaultImage,
      },
    ]);
    setMemeDetails({
      memeId: memeDetail ? memeDetail.memeId : "",
      image1: memeDetail?.image1 ? memeDetail.image1 : defaultImage,
      image2: memeDetail?.image2 ? memeDetail.image2 : defaultImage,
      image3: memeDetail?.image3 ? memeDetail.image3 : defaultImage,
      quotes: memeDetail ? memeDetail.quotes : "",
      creationDate: new Date().getTime(),
      isFavorite: memeDetail ? memeDetail.isFavorite : false,
    });
    setBoardImage1(memeDetail?.image1 ? memeDetail.image1 : defaultImage);
    setBoardImage2(memeDetail?.image2 ? memeDetail.image2 : defaultImage);
    setBoardImage3(memeDetail?.image3 ? memeDetail.image3 : defaultImage);
    setQuotes(memeDetail ? memeDetail.quotes : "");
    setIsEdit(memeDetail ? true : false);
  }, [memeDetail]);

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

  async function saveMeme() {
    memeDetails.image1 = boardImage1;
    memeDetails.image2 = boardImage2;
    memeDetails.image3 = boardImage3;
    memeDetails.quotes = quotes;
    memeDetails.creationDate = new Date().getTime();
    if (isEdit) {
      await firebase.updateMemeDetails(memeDetails);
    } else {
      await firebase.insertMemeDetails(memeDetails);
    }
    history.push("/favorites");
  }

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
                defaultValue={quotes}
              />
            </div>
            {isEdit && (
              <div className="d-flex justify-content-center">
                <div
                  onClick={generateQuote}
                  className="default-btn quotes-button edit-meme"
                >
                  GENERATE NEW QUOTE
                </div>
              </div>
            )}
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
