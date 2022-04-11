import React from "react";
import { useDrag } from "react-dnd";

export default function MainBoard({ id, url, gifDetails }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "image",
      item: { id: id, gifDetails: gifDetails },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [gifDetails]
  );
  return (
    <>
      <img
        ref={drag}
        src={url}
        style={{ border: isDragging ? "5px solid pink" : "0px" }}
      />
    </>
  );
}
