class Weather {
  constructor(i_Weather, i_TempUnit = "celcius") {
    this.fullName = `${i_Weather.name}, ${i_Weather.sys.country}`;
    this.tempUnit = i_TempUnit;
    this.main = this.calculateTemperature(i_Weather.main.temp, i_TempUnit);
    this.feels_like = this.calculateTemperature(
      i_Weather.main.feels_like,
      i_TempUnit
    );
    this.temp_max = this.calculateTemperature(
      i_Weather.main.temp_max,
      i_TempUnit
    );
    this.temp_min = this.calculateTemperature(
      i_Weather.main.temp_min,
      i_TempUnit
    );
    this.humidity = i_Weather.main.humidity;
    this.description =
      i_Weather.weather.length > 0 ? i_Weather.weather[0].main : "";
    this.raw = i_Weather;
  }

  static getTemperatureUnits() {
    return ["celcius", "fahrenheit"];
  }

  calculateTemperature(i_TempValue, i_TempUnit) {
    switch (i_TempUnit) {
      case "celcius": {
        return Math.round(i_TempValue - 273.15);
      }
      case "fahrenheit": {
        return Math.round((i_TempValue - 273.15) * (9 / 5) + 32);
      }
      default:
        break;
    }
  }
}

export default Weather;
