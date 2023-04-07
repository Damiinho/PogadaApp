import React, { Component } from "react";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import WeatherView from "./WeatherView";
import "./App.css";
import More from "./More";

const APIKey = "c856aa7be41ac7238f8c2b7f7f39306e";

class App extends Component {
  state = {
    value: "",
    cityFromAPI: null,
    confirmedCity: "",
    moreComponentText: (
      <p>
        ⮚
        <br />
        ⮚
        <br />⮚
      </p>
    ),
    moreElementActive: false,
    isElementHover: false,
  };

  componentDidUpdate() {
    if (this.state.cityFromAPI) {
      const appElement = document.querySelector(".App");
      const appViewElement = document.querySelector(".App__view");
      appElement.style.height = "100px";

      if (this.state.cityFromAPI.cod === 200) {
        const h1Element = document.querySelector(".App__view-title h1");
        const generalSecondDivElement = document.querySelector(
          ".App__view-data-general div:nth-of-type(2) div"
        );
        appElement.classList.remove("inactive");
        document.body.classList = this.state.cityFromAPI.weather[0].main.toLowerCase();

        appViewElement.style.opacity = 0;

        if (h1Element.offsetHeight > 1) {
          appViewElement.style.opacity = 1;
          if (generalSecondDivElement.offsetHeight > 22) {
            appElement.style.height = "622px";
          }
        }

        if (h1Element.offsetHeight > 43) {
          appElement.style.height = "643px";
          if (generalSecondDivElement.offsetHeight > 22) {
            appElement.style.height = "665px";
          }
        }
        if (h1Element.offsetHeight > 86) {
          appElement.style.height = "686px";
          if (generalSecondDivElement.offsetHeight > 22) {
            appElement.style.height = "708px";
          }
        }
      } else {
        appElement.classList.add("inactive");
        appElement.style.height = `100px`;
      }
    }
  }

  handleChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  handleClickButton = () => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${
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

    const moreElement = document.querySelector(".App__more-component");
    if (moreElement) {
      moreElement.classList.remove("active");
      this.setState({
        moreElementActive: false,
        moreComponentText: (
          <p>
            ⮚
            <br />
            ⮚
            <br />⮚
          </p>
        ),
      });
    }
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleClickButton();
    }
  };

  handleMouseEnter = () => {
    if (!this.state.moreElementActive) {
      setTimeout(() => {
        this.setState({
          moreComponentText: <p>na następne dni? kliknij</p>,
        });
      }, 200);
    }
    this.setState({ isElementHover: true });
  };
  handleMouseLeave = () => {
    if (!this.state.moreElementActive) {
      this.setState({
        moreComponentText: (
          <p>
            ⮚<br />⮚<br />⮚
          </p>
        ),
      });
    }
    this.setState({ isElementHover: false });
  };

  handleOnClick = () => {
    document.querySelector(".App__more-component").classList.toggle("active");
    this.setState({ moreElementActive: !this.state.moreElementActive });
    if (!this.state.moreElementActive) {
      setTimeout(() => {
        this.setState({ moreComponentText: "jest aktywny" });
      }, 100);
    }
    if (this.state.moreElementActive) {
      setTimeout(() => {
        if (this.state.isElementHover)
          this.setState({ moreComponentText: <p>na następne dni? kliknij</p> });
        if (!this.state.isElementHover) {
          this.setState({
            moreComponentText: (
              <p>
                ⮚<br />⮚<br />⮚
              </p>
            ),
          });
        }
      }, 100);
    }
  };

  render() {
    return (
      <div className="App inactive">
        {this.state.cityFromAPI && this.state.cityFromAPI.cod === 200 ? (
          <More
            click={this.handleOnClick}
            mouseLeave={this.handleMouseLeave}
            mouseEnter={this.handleMouseEnter}
            content={this.state.moreComponentText}
          />
        ) : null}

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
