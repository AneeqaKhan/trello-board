import React from "react";
import "./app.css";
import { Draggable } from "react-beautiful-dnd";
import Icon from "@material-ui/core/Icon";
import { deleteCard, editCard } from "../actions";

const Card = ({ text, cardId, index, dispatch, listId }) => {
  const handleDeleteCard = () => {
    dispatch(deleteCard(cardId, listId));
  }
  const handleEditCard = () => {
    
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
          <div className="list-action-button-container">
            <div onClick={handleEditCard}><Icon className="action-icon">edit</Icon></div>
            <div onClick={handleDeleteCard}><Icon className="action-icon">delete</Icon></div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
