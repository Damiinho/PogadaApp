import React from "react";

const now = new Date();

const WeatherView = (props) => {
  if (props.data.cod === 200) {
    const sunrise = new Date(props.data.sys.sunrise * 1000);
    const sunset = new Date(props.data.sys.sunset * 1000);
    return (
      <div>
        <p>
          dane na godzinę {now.getHours()}:{now.getMinutes()}, {now.getDate()}.
          {now.getMonth() < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1}.
          {now.getFullYear()}
        </p>
        <h1>{props.data.name}</h1>
        <p>
          położenie geograficzne: {props.data.coord.lat}, {props.data.coord.lon}
        </p>
        <p>temperatura: {props.data.main.temp}°C</p>
        <p>temperatura odczuwalna: {props.data.main.feels_like}°C</p>
        <p>
          wschód słońca: {sunrise.getHours()}:
          {sunrise.getMinutes() < 10
            ? `0${sunrise.getMinutes()}`
            : sunrise.getMinutes()}
        </p>
        <p>
          zachód słońca: {sunset.getHours()}:
          {sunset.getMinutes() < 10
            ? `0${sunset.getMinutes()}`
            : sunset.getMinutes()}
        </p>
        <p>ciśnienie: {props.data.main.pressure} hPa</p>
        <p>prędkość wiatru: {props.data.wind.speed} m/s</p>
      </div>
    );
  } else {
    return <h3>Nie mamy w bazie miejscowości {props.city}</h3>;
  }
};

export default WeatherView;
