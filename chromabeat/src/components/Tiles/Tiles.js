import React from "react";
import Tile from "../Tile/Tile";
import "./Tiles.css";

export default function Tiles(props) {
  return (
    <div className="tiles-container">
      {props.tileColors.map((color, index) => (
        <Tile key={index} color={color} onClick={() => props.setColor(index)} /> // update color on click
      ))}
    </div>
  );
}
