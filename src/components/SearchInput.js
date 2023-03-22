import React from "react";
const SearchInput = (props) => {
  return (
    <lebel>
      Wpisz miasto:{" "}
      <input
        onKeyDown={props.enter}
        type="text"
        onChange={props.change}
        value={props.value}
      />
    </lebel>
  );
};

export default SearchInput;
