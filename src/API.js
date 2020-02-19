const apiKey = "05fa84dacd26ebcf69705d2d9388c466";

export const fetchWeather = async i_LocationName => {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${i_LocationName}&appid=${apiKey}`
  )
    .then(result => {
      return result.json();
    })
    .catch(err => console.log(err));

  return weather;
};
