import React, { Component } from "react";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import WeatherView from "./WeatherView";
import "./App.css";

const APIKey = "c856aa7be41ac7238f8c2b7f7f39306e";

class App extends Component {
  state = {
    value: "",
    cityFromAPI: null,
    confirmedCity: "",
  };

  componentDidUpdate() {
    if (this.state.cityFromAPI) {
      if (this.state.cityFromAPI.cod === 200) {
        document.body.classList = this.state.cityFromAPI.weather[0].main.toLowerCase();
      }
    }
  }

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
        this.setState({
          cityFromAPI: data,
          confirmedCity: this.state.value,
          value: "",
        });
      });

    document.body.classList = `${this.state.confirmedCity}`;
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleClickButton();
    }
  };

  render() {
    return (
      <div className="App">
        <div className="App__search-component">
          <SearchInput
            enter={this.handleKeyDown}
            value={this.state.value}
            change={this.handleChangeInput}
          />
          <SearchButton click={this.handleClickButton} />
        </div>
        {this.state.cityFromAPI ? (
          <WeatherView
            data={this.state.cityFromAPI}
            city={this.state.confirmedCity}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
