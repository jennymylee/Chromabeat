import React from "react";
import "./Tile.css";

export default function Tile(props) {
  return (
    <div
      className="tile"
      style={{ backgroundColor: props.color }}
      onClick={props.onClick}
    ></div>
  );
}
