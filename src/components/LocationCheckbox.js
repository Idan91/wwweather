import React, { Component } from "react";
import Context from "../context/context";

class LocationCheckbox extends Component {
  static contextType = Context;

  handleClick = event => {
    this.context.changeLocationSelection(this.props.index);
  };

  render() {
    const checkboxName = `location${this.props.locationNumber}`;
    return (
      <React.Fragment>
        <div className="location">
          <input
            className="location-checkbox disable-select"
            type="checkbox"
            name={checkboxName}
            value={this.props.locationName}
            onChange={this.handleClick}
          />
          <div className="checkbox-box">
            {/* Font Awesome icon */}
            <i className="fas fa-check checkbox-content"></i>
          </div>
          <label className="checkbox-label" htmlFor={checkboxName}>
            {this.props.locationName}
          </label>
        </div>
      </React.Fragment>
    );
  }
}

export default LocationCheckbox;
