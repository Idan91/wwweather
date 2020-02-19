import React, { Component } from "react";
import Logo from "../resources/wwweather_Logo.svg";
import LocationCheckbox from "./LocationCheckbox";
import RadioButton from "./RadioButton";
import Card from "./Card";
import Footer from "./Footer";
import Weather from "../model/Weather";
import Context from "../context/context";

// Used to avoid state change without clicking the OK button
let myCheckedLocations = [];
let myTempUnitIndex = 0;

class WWWEATHER extends Component {
  state = {
    locations: [
      "Beijing",
      "Cape Town",
      "London",
      "Los Angeles",
      "Madrid",
      "Moscow",
      "New York",
      "Santiago",
      "Tel-Aviv",
      "Tokyo"
    ],
    temperatureUnits: [],
    temperatureIndex: 0,
    locationsToDisplay: [],
    checkboxes: [],
    cardsVisible: false
  };

  /* #region  LIFE-CYCLE METHODS */
  componentDidMount() {
    let displayStatus = [];
    let weatherData = [];

    this.state.locations.forEach(() => myCheckedLocations.push(false));
    this.state.locations.forEach(() => displayStatus.push(false));

    this.setState({
      locationsToDisplay: displayStatus,
      temperatureUnits: Weather.getTemperatureUnits(),
      weatherData: weatherData
    });
    this.renderLocationCheckboxes();
  }
  /* #endregion */

  /* #region HANDLER METHODS */
  changeLocationSelection = i_Index => {
    myCheckedLocations[i_Index] = !myCheckedLocations[i_Index];
  };

  handleDisplayWeather = () => {
    this.setState({
      cardsVisible: true,
      locationsToDisplay: myCheckedLocations,
      temperatureIndex: myTempUnitIndex
    });
  };

  changeTemperatureType = i_Index => {
    myTempUnitIndex = i_Index;
  };
  /* #endregion */

  /* #region RENDER METHODS */
  renderLocationCheckboxes = () => {
    let checkboxes = [];

    this.state.locations.forEach((location, index) => {
      const locationNumber = index + 1;
      checkboxes.push(
        <LocationCheckbox
          locationName={location}
          locationNumber={locationNumber}
          index={index}
          key={index}
        />
      );
    });

    this.setState({
      checkboxes
    });
  };

  renderTemperatureRadioButtons = () => {
    let radioButtons = [];

    this.state.temperatureUnits.forEach((temperature, index) => {
      let checked = false;
      if (index === this.state.temperatureIndex) {
        checked = true;
      }
      radioButtons.push(
        <RadioButton
          tempUnit={temperature}
          checked={checked}
          index={index}
          key={index}
        />
      );
    });

    return radioButtons;
  };

  renderWeatherCards = () => {
    let cards = [];
    const locationsToDisplay = this.state.locationsToDisplay;
    const tempUnit = this.state.temperatureUnits[this.state.temperatureIndex];
    let displayCount = 0;
    let classes = {
      card: "card",
      title: "card-text location-title",
      main: "location-temp",
      max_min: "temp-max-min",
      description: "loaction-temp-decription"
    };

    // Count displayed locations for card class definition
    locationsToDisplay.forEach(location => {
      if (location === true) {
        displayCount++;
      }
    });

    // Define card classes based on flex fit
    switch (true) {
      case displayCount === 1: {
        classes.card = "card card-single";
        break;
      }
      case displayCount > 5: {
        classes.card = "card card-multirow";
        classes.title = "card-text location-title-sml";
        classes.main = "location-temp-sml";
        break;
      }
      default:
        break;
    }

    this.state.locations.forEach((location, index) => {
      if (locationsToDisplay[index]) {
        cards.push(
          <Card
            location={location}
            key={index}
            tempUnit={tempUnit}
            classes={classes}
          />
        );
      }
    });

    return cards;
  };
  /* #endregion */

  render() {
    return (
      <Context.Provider
        value={{
          locations: this.state.locations,
          temperatureUnits: this.state.temperatureUnits,
          temperatureIndex: this.state.temperatureIndex,
          changeLocationSelection: this.changeLocationSelection,
          changeTemperatureType: this.changeTemperatureType
        }}
      >
        <React.Fragment>
          <div className="grid grid-header">
            <div></div>
            <div className="logo-container">
              <img className="logo" src={Logo} alt=""></img>
            </div>
            <div></div>
          </div>
          <div className="grid grid-locations">{this.state.checkboxes}</div>
          <div className="temp-type-container">
            {this.renderTemperatureRadioButtons()}
          </div>
          <div className="display-weather disable-select">
            <button onClick={this.handleDisplayWeather}>OK</button>
          </div>
          {this.state.cardsVisible === true && (
            <div className="card-container">{this.renderWeatherCards()}</div>
          )}
          <Footer />
        </React.Fragment>
      </Context.Provider>
    );
  }
}

export default WWWEATHER;
