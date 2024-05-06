import React, { useState } from "react";
import "./Tile.css";

export default function Tile(props) {
  const [showText, setShowText] = useState(false);
  const notes = ["C", "A", "B", "C", "D", "E", "F", "C"];

  const handleMouseEnter = () => {
    setShowText(true);
  };

  const handleMouseLeave = () => {
    setShowText(false);
  };

  return (
    <div
      className="tile"
      style={{ backgroundColor: props.color }}
      onClick={props.onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showText && (
        <span className="tile-text">
          {notes[props.noteIndex]}
          <br />
          {props.color}
        </span>
      )}
    </div>
  );
}
