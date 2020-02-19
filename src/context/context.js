import React from "react";

export default React.createContext({
  locations: [],
  checkedLocations: [],
  temperatureUnits: [],
  temperatureIndex: "",
  changeLocationSelection: () => {},
  changeTemperatureType: () => {}
});
