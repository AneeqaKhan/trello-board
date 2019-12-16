import React from "react";
import "./app.css";
import Card from "./Card";
import ActionButton from "./ActionButton";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Icon from "@material-ui/core/Icon";
import { deleteList } from "../actions";

const List = ({ title, cards = [], listID, index, dispatch }) => {
  const handleDeleteList = () => {
    dispatch(deleteList(listID));
  };
  return (
    <Draggable draggableId={String(listID)} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="list-container"
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listID)}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className="list-title-wrapper">
                  <h4>{title}</h4>
                  <div className="list-delete-button-container" onClick={handleDeleteList}>
                    <Icon>delete</Icon>
                  </div>
                </div>
                {cards.map((card, index) => (
                  <Card
                    listId={listID}
                    key={card.id}
                    index={index}
                    text={card.text}
                    cardId={card.id}
                    dispatch={dispatch}
                  />
                ))}
                <ActionButton listID={listID} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
