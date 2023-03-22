import React, { Component } from "react";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import WeatherView from "./WeatherView";

const APIKey = "c856aa7be41ac7238f8c2b7f7f39306e";

class App extends Component {
  state = {
    value: "",
    cityFromAPI: null,
    confirmedCity: "",
  };

  handleChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  handleClickButton = () => {
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${
      this.state.value
    }&APPID=${APIKey}&units=metric`;
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ cityFromAPI: data, confirmedCity: this.state.value });
      });
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleClickButton();
    }
  };

  render() {
    return (
      <>
        <SearchInput
          enter={this.handleKeyDown}
          value={this.state.value}
          change={this.handleChangeInput}
        />
        <SearchButton click={this.handleClickButton} />
        {this.state.cityFromAPI ? (
          <WeatherView
            data={this.state.cityFromAPI}
            city={this.state.confirmedCity}
          />
        ) : null}
      </>
    );
  }
}

export default App;
