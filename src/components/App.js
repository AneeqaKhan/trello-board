import React, { Component } from "react";
import List from "./List";
import { connect } from "react-redux";
import ActionButton from "./ActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";

class App extends Component {
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if(!destination) {
      return
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId, 
        type
      )
    )

  };
  render() {
    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <h2>My Board</h2>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              {provided => (
                 <div className="lists-wrapper" {...provided.droppableProps} ref={provided.innerRef}>
                  {lists.map((list, index) => (
                    <List
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={list.cards}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                  <ActionButton list />
                </div>
              )}
            </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);
