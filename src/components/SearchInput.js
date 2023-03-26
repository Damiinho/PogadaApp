import React from "react";
const SearchInput = (props) => {
  return (
    <label className="App__input">
      <input
        placeholder="Wyszukaj miejscowość"
        onKeyDown={props.enter}
        type="text"
        onChange={props.change}
        value={props.value}
      />
    </label>
  );
};

export default SearchInput;
