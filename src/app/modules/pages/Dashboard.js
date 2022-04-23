import React, { useEffect, useState } from "react";
import { Container, Button, Card, Carousel } from "react-bootstrap";
import profile from "../../assets/profile.png";
import "./Dashboard.css";
import firebase from "../../firebase/firebase";
import prj1 from "../../assets/project1-thumbnail.jpg";
import prj2 from "../../assets/project2-thumbnail.jpg";
import prj3 from "../../assets/project3-thumbnail.jpg";
import prj4 from "../../assets/project4-thumbnail.jpg";

export default function Dashboard() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const contactList = await firebase.retrieveworkList();
      contactList.onSnapshot((snapshot) => {
        const response = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setList(response);
      });
    }
    fetchData();
  }, []);
  return (
    <>
      <div>
        <div class="main">
          <Container>
            <h1>I’m many things.</h1>
            <h2>
              #traveler | #foodie | #catlover | #doglover | #graphicdesigner |
              #motiondesigner | #uxdesigner | #uidesigner | #fastlearner |
              #goodlistener{" "}
            </h2>
          </Container>{" "}
        </div>

        <div class="second" id="about">
          <Container>
            <div class="row">
              <div class="left">
                <img src={profile} />
              </div>
              <div class="right">
                <p>
                  Dynamic and innovative professional with 4+ years of
                  invaluable hands-on experience in handling several creative
                  design projects, UI/UX design, graphic design, web design, and
                  visual conceptualization. Equipped with the ability to
                  escalate brand awareness, Identify Opportunities and overcome
                  objections by utilizing the skills gained from the Bachelor of
                  Design degree in Fashion Communication from one of the most
                  renowned design institutions in India.{" "}
                </p>
              </div>
            </div>
          </Container>{" "}
        </div>

        <div class="experience">
          <Container>
            <Carousel>
              <Carousel.Item>
                <img src="https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg" />
                <Carousel.Caption>
                  <h1>Graphic Designer Aug 2018 - Apr 2020</h1>
                  <h2>Company : Vymo</h2>
                  <p>
                    Started as a Graphic designer at Vymo in Aug 2018. Won the
                    Rising Rockstar award in April 2018 Worked with teams like
                    Growth, Marketing, HR, Hiring, Product, etc and delivered
                    all their creative requirements. Started working with print
                    media, event coordination, infographics and booth setup as
                    well. Later during the same year managed Graphic Designing
                    along with animation and video editing.{" "}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg" />

                <Carousel.Caption>
                  <h1>Senior Designer Apr 2020 - Apr 2021</h1>
                  <h2>Company : Vymo</h2>
                  <p>
                    In April 2020 was promoted to Senior Graphic
                    Designer.Develop creative layouts for catalogs, documents,
                    posters, Decks, one-pagers, news releases, advertisements,
                    and other communication collaterals while ensuring maximum
                    brand awareness of target audience and market Maintaining an
                    updated Repository of all the digital content for future use
                    and easy accessibility. Nominated for the Best Performer
                    Award during that year. Was one among the 7 nominations from
                    over 300+ employees{" "}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg" />

                <Carousel.Caption>
                  <h1>Design Manager April 2021 - Present</h1>
                  <h2>Company : Vymo</h2>
                  <p>
                    In April 2021 was promoted as a Design Manager. I am
                    currently managing a team of creative heads working on
                    design, illustration, videography, animation, web
                    development, and web design. Closely working with the
                    product team on enhancing the mobile and web experience of
                    the product. Played an active role in the UI/UX projects.
                    Establish and manage graphic design business that aims to
                    assist the company in brand development Spearhead visual
                    identity including brand positioning, brand guidelines,
                    promotions, and digital marketing{" "}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Container>
        </div>

        <div class="works" id="works">
          <Container>
            <h1>Works </h1>
            {list.map((item, i) => {
              return (
                <Card style={{ width: "50%" }}>
                  <Card.Img
                    variant="top"
                    src={i==0?prj1:i==1?prj2:i==2?prj3:prj4}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      {
                        item.desc
                      }
                    </Card.Text>
                    <Button variant="primary" onClick={()=>{
                      window.open(item.url)
                    }}>View Full Work</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Container>
        </div>
      </div>
    </>
  );
}
