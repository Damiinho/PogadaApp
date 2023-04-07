import React from "react";
import TempIMG from "../img/temp.png";
import cloudsIMG from "../img/clouds.png";
import humidityIMG from "../img/humidity.png";
// import pressureIMG from "../img/pressure-gauge.png";
// import windIMG from "../img/wind.png";

const More = (props) => {
  return (
    <div
      className="App__more-component"
      onMouseEnter={props.mouseEnter}
      onMouseLeave={props.mouseLeave}
      onClick={props.click}
    >
      {props.active && props.data !== null ? (
        <>
          <div className="App__more-component__title">najbliższa doba</div>
          <div className="App__more-component__hours">
            {props.data.list.slice(0, 8).map((item, index) => (
              <Hour key={index} data={item} />
            ))}
          </div>
          <NextDays />
        </>
      ) : (
        props.content
      )}
    </div>
  );
};

const Hour = (props) => {
  return (
    <div className="App__more-component__hour">
      <TitleHour hour={new Date(props.data.dt * 1000).getHours()} />{" "}
      <Weather
        main={props.data.weather[0].main}
        icon={props.data.weather[0].icon}
      />
      <Temp temp={props.data.main.temp} />
      <FeelsLike temp={props.data.main.feels_like} />
      <Clouds all={props.data.clouds.all} />
      <Humidity humidity={props.data.main.humidity} />
      <Wind wind={props.data.wind.speed} deg={props.data.wind.deg} />
      <Pressure pressure={props.data.main.pressure} />
    </div>
  );
};

const TitleHour = (props) => {
  return <div className="hour">{props.hour}:00</div>;
};
const Temp = (props) => {
  return (
    <div className="temp">
      <img src={TempIMG} alt="termometer" />
      {Math.round(props.temp)}°C
    </div>
  );
};
const FeelsLike = (props) => (
  <div className="feels" title="odczuwalna">
    ({Math.round(props.temp)} °C)
  </div>
);
const Weather = (props) => {
  let weatherCondition = () => {
    if (props.main === "Thunderstorm") {
      return "burza";
    }
    if (props.main === "Drizzle") {
      return "mżawka";
    }
    if (props.main === "Rain") {
      return "deszcz";
    }
    if (props.main === "Snow") {
      return "śnieg";
    }
    if (
      props.main === "Mist" ||
      props.main === "Smoke" ||
      props.main === "Haze" ||
      props.main === "Fog"
    ) {
      return "mgła";
    }
    if (props.main === "Dust") {
      return "kurz";
    }
    if (props.main === "Sand") {
      return "piasek";
    }
    if (props.main === "Ash") {
      return "popiół wulkaniczny";
    }
    if (props.main === "Squall") {
      return "szkwał";
    }
    if (props.main === "Tornado") {
      return "tornado";
    }
    if (props.main === "Clear") {
      return "bezchmurnie";
    }
    if (props.main === "Clouds") {
      return "pochmurno";
    }
  };
  weatherCondition = weatherCondition();

  return (
    <div className="weather">
      {weatherCondition}{" "}
      <img
        src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`}
        alt="pogoda"
      />
    </div>
  );
};
const Clouds = (props) => (
  <div className="clouds" title="zachmurzenie">
    <img src={cloudsIMG} alt="clouds" /> {props.all}%
  </div>
);

const Humidity = (props) => (
  <div className="humidity" title="wilgotność">
    <img src={humidityIMG} alt="humidity" /> {props.humidity}%
  </div>
);
const Wind = (props) => (
  <div className="wind" title="prędkość wiatru">
    {/* <img src={windIMG} alt="wind" /> */}
    <div>
      <p style={{ transform: `rotate(${props.deg}deg)` }}>🢁</p>
    </div>
    <p>{props.wind.toFixed(1)}m/s</p>
  </div>
);
const Pressure = (props) => (
  <div className="pressure" title="ciśnienie">
    {/* <img src={pressureIMG} alt="pressure" /> */}
    {props.pressure}hPA
  </div>
);
const handleNextDaysClick = () => {
  document
    .querySelector(".App__more-component__days")
    .classList.toggle("active");
};

const NextDays = () => (
  <div className="App__more-component__days" onClick={handleNextDaysClick}>
    Pogoda na następne dni (rozwiń)
  </div>
);

export default More;
