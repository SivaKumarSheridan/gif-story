import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import FavoritesItem from "./FavoritesItem";
import "./Favorites.css";
import firebase from "../../../firebase/firebase";
import { GiphyFetch } from "@giphy/js-fetch-api";

export default function FavoritesList() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const giphy = new GiphyFetch("KN85AKZvPoWj10aofG7zkn5ZKEiXaZGC");
  const [defaultWait1, setDefaultWait1] = useState("");
  const [defaultWait2, setDefaultWait2] = useState("");
  const mrBeanGifId = "QBd2kLB5qDmysEXre9";
  const waitingGifId = "4NnTap3gOhhlik1YEw";
  useEffect(() => {
    async function fetchData() {
      const { data: gif1 } = await giphy.gif(mrBeanGifId);
      setDefaultWait1(gif1.images.original.url);
      const { data: gif2 } = await giphy.gif(waitingGifId);
      setDefaultWait2(gif2.images.original.url);
      const orderList = await firebase.retrieveMemeList();
      orderList.onSnapshot((snapshot) => {
        const response = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        const favList = response.filter((item) => item.isFavorite == true);
        const hisList = response.filter((item) => item.isFavorite == false);
        setFavoriteList(favList);
        setHistoryList(hisList);
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <Container className="fav-main">
        <h1>Favorites</h1>
        <br />
        <Row>
          {favoriteList.map((item) => {
            return (
              <Col className="fav-list" md="4">
                <FavoritesItem item={item} />
              </Col>
            );
          })}
        </Row>
        <Row >
            {favoriteList.length <= 0 && (
              <Col lg="0">
                <Image fluid={true} src={defaultWait1} />
              </Col>
            )}
          </Row>
        <div className="history">
          <h1>History</h1>
          <br />
          <Row>
            {historyList.map((item) => {
              return (
                <Col className="fav-list" md="4">
                  <FavoritesItem item={item} />
                </Col>
              );
            })}
          </Row>
          <Row>
            {historyList.length <= 0 && (
              <Col lg="0">
                <Image fluid={true} src={defaultWait2} />
              </Col>
            )}
          </Row>
        </div>
      </Container>
    </>
  );
}
