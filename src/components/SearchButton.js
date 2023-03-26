import React from "react";

const SearchButton = (props) => {
  return (
    <button className="App__button" onClick={props.click}>
      szukaj
    </button>
  );
};

export default SearchButton;
