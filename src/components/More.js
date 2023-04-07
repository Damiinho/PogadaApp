import React from "react";

const More = (props) => {
  return (
    <div
      className="App__more-component"
      onMouseEnter={props.mouseEnter}
      onMouseLeave={props.mouseLeave}
      onClick={props.click}
    >
      {props.content}
    </div>
  );
};

export default More;
