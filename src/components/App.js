import React, { Component } from "react";

class App extends Component {
  state = {};

  render() {
    const APIKey = "efa2ef11f117f7485b2fca8e87a3a2f5";
    return (
      <div>
        <p>działa, klucz API: {APIKey}</p>
      </div>
    );
  }
}

export default App;
