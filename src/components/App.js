import React, { Component } from "react";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import WeatherView from "./WeatherView";
import More from "./More";

import "./App.css";
const APIKey = "c856aa7be41ac7238f8c2b7f7f39306e";
class App extends Component {
  state = {
    value: "",
    cityFromAPI: null,
    confirmedCity: "",
    lat: null,
    lon: null,
    cityFromCoordinatesAPI: null,
    moreComponentText: (
      <>
        <p>24 h</p>
        <p>pogoda</p>
        <p>(kliknij)</p>
      </>
    ),
    moreElementActive: false,
    isElementHover: false,
    isWeekActive: false,
    isDetailsActive: false,
    isSmallScreen: window.innerWidth < 1050,
    isMobileScreen: window.innerWidth < 410,
    isAppViewActive: true,
  };

  componentDidMount() {
    document
      .getElementById("root")
      .addEventListener("click", this.handleDocumentClick);
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    document
      .getElementById("root")
      .removeEventListener("click", this.handleDocumentClick);

    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    setTimeout(
      () => {
        this.setState({
          isSmallScreen: window.innerWidth < 1050,
          isMobileScreen: window.innerWidth < 410,
        });

        if (this.state.moreElementActive) {
        }

        if (
          !this.state.isMobileScreen &&
          document.querySelector(".App__view")
        ) {
          document.querySelector(".App__view").style.display = "block";
          this.setState({ isAppViewActive: true });
        }
        if (
          this.state.isMobileScreen &&
          this.state.moreElementActive &&
          document.querySelector(".App__view")
        ) {
          document.querySelector(".App__view").style.display = "none";
          this.setState({ isAppViewActive: false });
        }
      },

      300
    );
  };

  handleDocumentClick = (e) => {
    if (
      this.state.moreElementActive &&
      e.target === document.getElementById("root")
    ) {
      this.setState({
        moreElementActive: false,
        moreComponentText: (
          <>
            <p>24 h</p>
            <p>pogoda</p>
            <p>(kliknij)</p>
          </>
        ),
      });
      document.querySelector(".App__more-component").classList.remove("active");
    }
    if (
      this.state.isDetailsActive &&
      e.target === document.getElementById("root")
    ) {
      document.querySelector(".App__view-details").classList.remove("active");
      this.setState({ isDetailsActive: false });
    }

    if (
      e.target === document.querySelector("div.App__more-component__footer") ||
      document.querySelector("div.App__more-component__footer p")
    ) {
      if (this.state.isMobileScreen && !this.state.isAppViewActive) {
        document.querySelector(".App__view").style.display = "block";
        this.setState({ isAppViewActive: true });
      }

      this.setState({
        moreElementActive: false,
        moreComponentText: (
          <>
            <p>24 h</p>
            <p>pogoda</p>
            <p>(kliknij)</p>
          </>
        ),
      });
      document.querySelector(".App__more-component").classList.remove("active");
    }
  };

  componentDidUpdate() {
    if (this.state.cityFromAPI) {
      const appElement = document.querySelector(".App");
      const appViewElement = document.querySelector(".App__view");
      if (!this.state.isMobileScreen) {
        appElement.style.height = "100px";
      }
      if (this.state.cityFromAPI.cod === 200) {
        const h1Element = document.querySelector(".App__view-title h1");
        const generalSecondDivElement = document.querySelector(
          ".App__view-data-general div:nth-of-type(2) div"
        );
        appElement.classList.remove("inactive");
        document.body.classList = this.state.cityFromAPI.weather[0].main.toLowerCase();

        appViewElement.style.opacity = 0;

        if (this.state.isMobileScreen) {
          appViewElement.style.opacity = "1";
          appElement.style.height = "";
        }

        if (h1Element.offsetHeight > 1 && !this.state.isMobileScreen) {
          appViewElement.style.opacity = "1";
          if (generalSecondDivElement.offsetHeight > 20) {
            appElement.style.height = "622px";
          }
        }

        if (h1Element.offsetHeight > 43 && !this.state.isMobileScreen) {
          appElement.style.height = "643px";
          if (generalSecondDivElement.offsetHeight > 22) {
            appElement.style.height = "665px";
          }
        }
        if (h1Element.offsetHeight > 86 && !this.state.isMobileScreen) {
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
    const APIforCoordinates = `
      https://api.openweathermap.org/geo/1.0/direct?q=${
        this.state.value
      }&appid=${APIKey}`;

    fetch(APIforCoordinates)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          this.setState({ lat: data[0].lat, lon: data[0].lon });
        } else this.setState({ lat: null, lon: null });
      });

    const moreElement = document.querySelector(".App__more-component");
    if (moreElement) {
      moreElement.classList.remove("active");
      this.setState({
        moreElementActive: false,
        moreComponentText: (
          <>
            <p>24 h</p>
            <p>pogoda</p>
            <p>(kliknij)</p>
          </>
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
          moreComponentText: (
            <>
              <p>24 h</p>
              <p>pogoda</p>
              <p>(kliknij)</p>
            </>
          ),
        });
      }, 100);
    }
    this.setState({ isElementHover: true });
  };
  handleMouseLeave = () => {
    if (
      !this.state.moreElementActive &&
      !document
        .querySelector(".App__more-component")
        .classList.contains("active")
    ) {
      setTimeout(() => {
        this.setState({
          moreComponentText: (
            <>
              <p>24 h</p>
              <p>pogoda</p>
              <p>(kliknij)</p>
            </>
          ),
        });
      }, 100);
    }
    this.setState({ isElementHover: false });
  };

  handleOnMoreClick = () => {
    if (!this.state.moreElementActive) {
      document.querySelector(".App__more-component").classList.add("active");
      this.setState({ moreElementActive: true });
      const API = `https://api.openweathermap.org/data/2.5/forecast?lat=${
        this.state.lat
      }&lon=${this.state.lon}&appid=${APIKey}&units=metric`;

      fetch(API)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ cityFromCoordinatesAPI: data });
        });
    }
    // if (this.state.moreElementActive) {
    //   this.setState({ isWeekActive: !this.state.isWeekActive });
    // }
    // ukrycie obsługi widoku tygodniowej prognozy

    if (this.state.isDetailsActive) {
      document.querySelector(".App__view-details").classList.remove("active");
      this.setState({ isDetailsActive: false });
    }
    if (this.state.isMobileScreen && this.state.isAppViewActive) {
      document.querySelector(".App__view").style.display = "none";
      this.setState({ isAppViewActive: false });
    }
  };

  handleDetailsOnClick = () => {
    document.querySelector(".App__view-details").classList.toggle("active");
    this.setState({ isDetailsActive: !this.state.isDetailsActive });
  };

  handleSunClick = () => {
    // console.log("test");
  };

  render() {
    return (
      <div className="App inactive">
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
            detailsClick={this.handleDetailsOnClick}
            isDetailsActive={this.state.isDetailsActive}
            sunClick={this.handleSunClick}
          />
        ) : null}
        {this.state.cityFromAPI && this.state.cityFromAPI.cod === 200 ? (
          <More
            click={this.handleOnMoreClick}
            mouseLeave={this.handleMouseLeave}
            mouseEnter={this.handleMouseEnter}
            content={this.state.moreComponentText}
            city={this.state.confirmedCity}
            data={this.state.cityFromCoordinatesAPI}
            active={this.state.moreElementActive}
            isWeekActive={this.state.isWeekActive}
            isSmallScreen={this.state.isSmallScreen}
            closeClick={this.handleDocumentClick}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
