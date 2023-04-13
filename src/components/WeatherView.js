import React from "react";
import sunriseIMG from "../img/sunrise.png";
import sunsetIMG from "../img/sunset.png";
import pressureIMG from "../img/pressure-gauge.png";
import windIMG from "../img/wind.png";
import cloudsIMG from "../img/clouds.png";
import humidityIMG from "../img/humidity.png";

const now = new Date();

const WeatherView = (props) => {
  if (props.data.cod === 200) {
    const sunrise = new Date(props.data.sys.sunrise * 1000);
    const sunset = new Date(props.data.sys.sunset * 1000);
    const sunriseLocal = `${sunrise.getHours()}:${
      sunrise.getMinutes() < 10
        ? `0${sunrise.getMinutes()}`
        : sunrise.getMinutes()
    }`;
    const sunsetLocal = `${sunset.getHours()}:${
      sunset.getMinutes() < 10 ? `0${sunset.getMinutes()}` : sunset.getMinutes()
    }`;

    let weatherCondition = () => {
      if (props.data.weather[0].main === "Thunderstorm") {
        return "burza";
      }
      if (props.data.weather[0].main === "Drizzle") {
        return "mżawka";
      }
      if (props.data.weather[0].main === "Rain") {
        return "deszcz";
      }
      if (props.data.weather[0].main === "Snow") {
        return "śnieg";
      }
      if (
        props.data.weather[0].main === "Mist" ||
        props.data.weather[0].main === "Smoke" ||
        props.data.weather[0].main === "Haze" ||
        props.data.weather[0].main === "Fog"
      ) {
        return "mgła";
      }
      if (props.data.weather[0].main === "Dust") {
        return "kurz";
      }
      if (props.data.weather[0].main === "Sand") {
        return "piasek";
      }
      if (props.data.weather[0].main === "Ash") {
        return "popiół wulkaniczny";
      }
      if (props.data.weather[0].main === "Squall") {
        return "szkwał";
      }
      if (props.data.weather[0].main === "Tornado") {
        return "tornado";
      }
      if (props.data.weather[0].main === "Clear") {
        return "bezchmurnie";
      }
      if (props.data.weather[0].main === "Clouds") {
        return "pochmurno";
      }
    };
    weatherCondition = weatherCondition();

    const Pressure = () =>
      props.isDetailsActive ? (
        <div className="App__view-pressure">
          <img src={pressureIMG} alt="" /> {props.data.main.pressure} hPa –
          ciśnienie
        </div>
      ) : (
        <div className="App__view-pressure">
          <img src={pressureIMG} alt="" /> {props.data.main.pressure} hPa
        </div>
      );

    const Windspeed = () =>
      props.isDetailsActive ? (
        <>
          <div className="App__view-windspeed">
            <img src={windIMG} alt="wind" /> {props.data.wind.speed} m/s – wiatr
            {"    "}
            <p
              style={{
                transform: `rotate(${props.data.wind.deg}deg)`,
              }}
            >
              🢁
            </p>
          </div>
        </>
      ) : (
        <div className="App__view-windspeed">
          <img src={windIMG} alt="wind" /> {props.data.wind.speed} m/s
        </div>
      );

    const Clouds = () =>
      props.isDetailsActive ? (
        <div className="App__view-clouds">
          <img src={cloudsIMG} alt="clouds" />
          {props.data.clouds.all}% – zachmurzenie
        </div>
      ) : (
        <div className="App__view-clouds">
          <img src={cloudsIMG} alt="clouds" />
          {props.data.clouds.all}%
        </div>
      );

    const Humidity = () =>
      props.isDetailsActive ? (
        <div className="App__view-humidity">
          <img src={humidityIMG} alt="humidity" />
          {props.data.main.humidity}% – wilgotność
        </div>
      ) : (
        <div className="App__view-humidity">
          <img src={humidityIMG} alt="humidity" />
          {props.data.main.humidity}%
        </div>
      );

    return (
      <div className="App__view">
        <Time now={now} />
        <div className="App__view-title">
          <h1>{props.city.toUpperCase()}</h1>
          {props.foundCity ? (
            <p>
              ({props.foundCity.country}, {props.foundCity.state})
            </p>
          ) : null}
          <Coordinates lat={props.data.coord.lat} lon={props.data.coord.lon} />
        </div>
        <div className="App__view-data">
          <div className="App__view-data-general">
            <div>
              <Temp temp={props.data.main.temp} />
              <TempFeelsLike temp={props.data.main.feels_like} />
            </div>
            <div>
              <WeatherImg img={props.data.weather[0].icon} />
              <div>{weatherCondition}</div>
            </div>
          </div>
          <div className="App__view-sun" onClick={props.sunClick}>
            <Sunrise sunrise={sunriseLocal} />
            <Sunset sunset={sunsetLocal} />
          </div>

          <div className="App__view-details" onClick={props.detailsClick}>
            {props.isDetailsActive ? (
              <>
                <Clouds />
                <Windspeed />
                <Humidity />
                <Pressure />
              </>
            ) : (
              <>
                <Clouds />
                <Windspeed />
                <Humidity />
                <Pressure />
              </>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <NotInDatabase city={props.city} />;
  }
};

const NotInDatabase = (props) => {
  if (props.city) {
    return (
      <h3 style={{ marginTop: 40 }}>Brak „{props.city}” w bazie danych</h3>
    );
  } else {
    return null;
  }
};

const Time = (props) => {
  return (
    <div className="App__view-time">
      dane na godzinę {props.now.getHours()}:
      {props.now.getMinutes() < 10
        ? `0${props.now.getMinutes()}`
        : props.now.getMinutes()}
      , {props.now.getDate()}.
      {props.now.getMonth() < 10
        ? `0${props.now.getMonth() + 1}`
        : props.now.getMonth() + 1}
      .{props.now.getFullYear()}
    </div>
  );
};

const Coordinates = (props) => {
  return (
    <div className="App__view-coordinates">
      (
      <a
        href={`http://maps.google.com/maps?ll=${props.lat},${
          props.lon
        }&spn=0.1,0.1&t=p&q=${props.lat},${props.lon}`}
      >
        znajdź w Google Maps
      </a>
      )
    </div>
  );
};

const Temp = (props) => {
  return <div className="App__view-temp">{props.temp}°C</div>;
};
const TempFeelsLike = (props) => {
  return (
    <div className="App__view-temp-feels-like">odczuwalna: {props.temp}°C</div>
  );
};

const WeatherImg = (props) => {
  return (
    <img src={`https://openweathermap.org/img/wn/${props.img}@2x.png`} alt="" />
  );
};

const Sunrise = (props) => {
  return (
    <div className="App__view-sunrise">
      <img src={sunriseIMG} alt="sunrise" />
      <div>{props.sunrise}</div>
      <div />
    </div>
  );
};
const Sunset = (props) => {
  return (
    <div className="App__view-sunset">
      <img src={sunsetIMG} alt="sunset" /> <div>{props.sunset}</div>
    </div>
  );
};

export default WeatherView;
