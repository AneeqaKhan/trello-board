import React from "react";
import "./app.css";
import { Draggable } from "react-beautiful-dnd";
import Icon from "@material-ui/core/Icon";
import { deleteCard } from "../actions";

const Card = ({ text, cardId, index, dispatch, listId }) => {
  const handleDeleteCard = () => {
    dispatch(deleteCard(cardId, listId));
  }
  return (
    <Draggable draggableId={String(cardId)} index={index}>
      {provided => (
        <div
          className="card-conatiner"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{text}</p>
          <div className="list-delete-button-container" onClick={handleDeleteCard}>
            <Icon>delete</Icon>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
