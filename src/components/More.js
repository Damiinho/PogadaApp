import React from "react";

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
          <div className="App__more-component__title">
            {props.city} – pogoda na dobę
          </div>
          <div className="App__more-component__hours">
            {props.data.list.slice(0, 7).map((item, index) => (
              <Hour key={index} data={item} />
            ))}

            {/* <div>
              <div>{new Date(props.data.list[0].dt * 1000).getHours()}:00</div>
              <div>{props.data.list[0].main.temp} – temperatura</div>
              <div>{props.data.list[0].main.feels_like} – dzień</div>
              <div>{props.data.list[0].weather[0].main} – dzień</div>
              <div>{props.data.list[0].clouds.all} – dzień</div>
            </div> */}
          </div>

          <div className="App__more-component__days">
            Pogoda na następne dni (rozwiń)
          </div>
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
      <div>{new Date(props.data.dt * 1000).getHours()}:00</div>
      <div>{props.data.main.temp}</div>
      <div>{props.data.main.feels_like}</div>
      <div>{props.data.weather[0].main}</div>
      <div>{props.data.clouds.all}</div>
    </div>
  );
};

export default More;
