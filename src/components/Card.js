import React from "react";
import "./app.css";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ text, id, index }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {provided => (
        <div
          className="card-conatiner"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{text}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
