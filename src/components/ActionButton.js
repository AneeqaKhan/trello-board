import React from "react";
import Icon from "@material-ui/core/Icon";
import Textarea from "react-textarea-autosize";
import {connect} from "react-redux";
import {addList, addCard} from "../actions";

class ActionButton extends React.Component {
  state = {
    formOpen: false,
    text: ""
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false,
    });
  };

  handleInputChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const {text} = this.state;

    if (text) {
      dispatch(addList(text));
      this.setState({ text: ""})
    }
    
    return
  }

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const {text} = this.state;

    if (text) {
      dispatch(addCard(listID, text));
      this.setState({ text: ""})
    }
    
    return
  }

  renderAddButton = () => {
    const { list } = this.props;
    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0, 0, 0, .15)" : "inherit";

    return (
      <div
        onClick={this.openForm}
        style={{
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackground,
        }}
        className="action-button-container"
      >
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  renderForm = () => {
    const { list } = this.props;
    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";
    const buttonTitle = list ? "Add List" : "Add Card";
    return (
      <div>
          <Textarea
            className="textarea"
            placeholder={placeholder}
            autoFocus
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handleInputChange}
          />
        <div className="add-button-container">
          <button className="add-button" onMouseDown={list ? this.handleAddList : this.handleAddCard}>{buttonTitle}</button>
          <Icon>close</Icon>
        </div>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();

  }
}

export default connect()(ActionButton);
