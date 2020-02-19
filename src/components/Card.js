import React, { Component } from "react";
import { fetchWeather } from "../API";
import Weather from "../model/Weather";
import Context from "../context/context";

class Card extends Component {
  state = {
    weatherData: "",
    weather: ""
  };

  static contextType = Context;

  /* #region LIFE-CYCLE METHODS */
  componentDidMount() {
    this.getWeatherData()
      .then(data => {
        this.setState({
          weatherData: data
        });
        this.setWeatherObject(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillReceiveProps() {
    this.setWeatherObject(this.state.weatherData);
  }
  /* #endregion */

  /* #region WEATHER METHODS */
  getWeatherData = async () => {
    const fetchedData = await fetchWeather(this.props.location);
    return fetchedData;
  };

  setWeatherObject = async i_WeatherData => {
    if (i_WeatherData.cod === "404") {
      this.setState({
        weather: {
          fullName: i_WeatherData.message,
          main: "N/A",
          temp_max: "",
          temp_min: ""
        }
      });
    } else {
      this.setState({
        weather: new Weather(
          await i_WeatherData,
          this.context.temperatureUnits[this.context.temperatureIndex]
        )
      });
    }
  };
  /* #endregion */

  render() {
    // Get temperature unit letter (e. "C for celcius")
    const tempUnitChar = this.context.temperatureUnits[
      this.context.temperatureIndex
    ][0].toUpperCase();

    return (
      <React.Fragment>
        {this.state.weather.main !== undefined && (
          <div className={this.props.classes.card}>
            <div className="grid grid-card">
              <div className={this.props.classes.title}>
                <span>{`${this.state.weather.fullName}`}</span>
              </div>
              <div className="card-text">
                <div className={this.props.classes.main}>
                  <p>
                    {this.state.weather.main}&deg;{tempUnitChar}
                  </p>
                  <p id="temp-max-min">
                    H: {this.state.weather.temp_max}&deg;{tempUnitChar}
                    &ensp;|&ensp; L: {this.state.weather.temp_min}&deg;
                    {tempUnitChar}
                  </p>
                </div>
              </div>
              <div className="card-text loaction-temp-description">
                <span> {this.state.weather.description}</span>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Card;
