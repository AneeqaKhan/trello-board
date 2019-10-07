import React, { Component } from "react";
import Column from "./Column";
import "./App.css";

const DIRECTION_LEFT = -1;
const DIRECTION_RIGHT = 1;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: []
    };
  }

  handleAddColumn = () => {
    const name = window.prompt("Name?");
    if (!name) return;
    const card = { name };
    this.setState(prevState => {
      return prevState.columns.push({ name: name, cards: [] });
    });
  };

  handleAdd = columnIndex => {
    const name = window.prompt("Name?");
    if (!name) return;
    const card = { name };
    this.setState(prevState => {
      const { columns } = prevState;
      columns[columnIndex].cards.push(card);
      return { columns };
    });
  };

  handleMove = (columnIndex, cardIndex, direction) => {
    this.setState(prevState => {
      const { columns } = prevState;
      const [card] = columns[columnIndex].cards.splice(cardIndex, 1);
      columns[columnIndex + direction].cards.push(card);
      return { columns };
    });
  };

  render() {
    return (
      <div className="App">
        <h3>My Board</h3>
        <section className="section-container">
          {this.state.columns.map((column, columnIndex) => (
            <Column
              column={column}
              columnIndex={columnIndex}
              key={columnIndex}
              onMoveLeft={cardIndex =>
                this.handleMove(columnIndex, cardIndex, DIRECTION_LEFT)
              }
              onMoveRight={cardIndex =>
                this.handleMove(columnIndex, cardIndex, DIRECTION_RIGHT)
              }
              onAddCard={() => this.handleAdd(columnIndex)}
            />
          ))}
          <button onClick={this.handleAddColumn} className="add-column-btn">
            Add Column
          </button>
        </section>
      </div>
    );
  }
}

export default App;
