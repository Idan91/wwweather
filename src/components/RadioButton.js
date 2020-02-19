import React, { Component } from "react";
import Context from "../context/context";

class RadioButton extends Component {
  static contextType = Context;

  handleClick = event => {
    this.context.changeTemperatureType(this.props.index);
  };

  render() {
    return (
      <div className="temp disable-select">
        <input
          type="radio"
          id={this.props.tempUnit}
          name="temp"
          onClick={this.handleClick}
          defaultChecked={this.props.checked === true && "checked"}
        />
        <label htmlFor={this.props.tempUnit} className="temp-label">
          {this.props.tempUnit}
        </label>
      </div>
    );
  }
}

export default RadioButton;
