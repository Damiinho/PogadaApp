import React from "react";

const now = new Date();

const WeatherView = (props) => {
  if (props.data.cod === 200) {
    const sunrise = new Date(props.data.sys.sunrise * 1000);
    const sunset = new Date(props.data.sys.sunset * 1000);

    let weatherCondition = () => {
      if (props.data.weather[0].main === "Thunderstorm") {
        return "Burza";
      }
      if (props.data.weather[0].main === "Drizzle") {
        return "Mżawka";
      }
      if (props.data.weather[0].main === "Rain") {
        return "Deszcz";
      }
      if (props.data.weather[0].main === "Snow") {
        return "Śnieg";
      }
      if (
        props.data.weather[0].main === "Mist" ||
        props.data.weather[0].main === "Smoke" ||
        props.data.weather[0].main === "Haze" ||
        props.data.weather[0].main === "Fog"
      ) {
        return "Mgła";
      }
      if (props.data.weather[0].main === "Dust") {
        return "Kurz";
      }
      if (props.data.weather[0].main === "Sand") {
        return "Piasek";
      }
      if (props.data.weather[0].main === "Ash") {
        return "Popiół wulkaniczny";
      }
      if (props.data.weather[0].main === "Squall") {
        return "Szkwał";
      }
      if (props.data.weather[0].main === "Tornado") {
        return "Tornado";
      }
      if (props.data.weather[0].main === "Clear") {
        return "Bezchmurne niebo";
      }
      if (props.data.weather[0].main === "Clouds") {
        return "Pochmurno";
      }
    };
    weatherCondition = weatherCondition();

    return (
      <div className="App__view">
        <div className="App__view-time">
          dane na godzinę {now.getHours()}:
          {now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()},{" "}
          {now.getDate()}.
          {now.getMonth() < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1}.
          {now.getFullYear()}
        </div>
        <div className="App__view-title">
          <h1>{props.data.name}</h1>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${
                props.data.weather[0].icon
              }@2x.png`}
              alt=""
            />
            <div>{weatherCondition}</div>
          </div>
        </div>
        <div className="App__view-data">
          <div className="App__view-coordinates">
            {props.data.coord.lat}, {props.data.coord.lon} –
            <a
              href={`http://maps.google.com/maps?ll=${props.data.coord.lat},${
                props.data.coord.lon
              }&spn=0.1,0.1&t=p&q=${props.data.coord.lat},${
                props.data.coord.lon
              }`}
            >
              otwórz w Google Maps
            </a>
          </div>
          <div className="App__view-temp">
            temperatura: {props.data.main.temp}°C
          </div>
          <div>temperatura odczuwalna: {props.data.main.feels_like}°C</div>
          <div className="App__view-sun">
            <div className="App__view-sunrise">
              wschód słońca: {sunrise.getHours()}:
              {sunrise.getMinutes() < 10
                ? `0${sunrise.getMinutes()}`
                : sunrise.getMinutes()}
            </div>

            <div className="App__view-sunset">
              zachód słońca: {sunset.getHours()}:
              {sunset.getMinutes() < 10
                ? `0${sunset.getMinutes()}`
                : sunset.getMinutes()}
            </div>
          </div>
          <div className="App__view-pressure">
            ciśnienie: {props.data.main.pressure} hPa
          </div>
          <div className="App__view-windspeed">
            prędkość wiatru: {props.data.wind.speed} m/s
          </div>
          <div className="App__view-clouds">
            Zachmurzenie: {props.data.clouds.all}%
          </div>
        </div>
      </div>
    );
  } else {
    return <h3>Nie mamy w bazie miejscowości {props.city}</h3>;
  }
};

export default WeatherView;
