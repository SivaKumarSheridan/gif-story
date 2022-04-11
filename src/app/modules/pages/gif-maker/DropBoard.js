import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Col } from "react-bootstrap";

export default function DropBoard({ id, handleBoadUpdated, url }) {
  const [board, setBoard] = useState({
    id: 1,
    images: {
      original: {
        url: url,
      },
    },
  });
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  async function addImageToBoard(item) {
    setBoard(item.gifDetails);
    handleBoadUpdated(id, item.gifDetails);
  }

  return (
    <>
      <Col ref={drop}>
        <div className="gif-img">
          <img src={board.images.original.url} />
        </div>
      </Col>
    </>
  );
}
