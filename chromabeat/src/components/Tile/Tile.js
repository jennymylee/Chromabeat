import React, { useState, useEffect } from "react";
import "./Tile.css";

export default function Tile(props) {
  const [showText, setShowText] = useState(false);
  const notes = ["C", "D", "E", "F", "G", "A", "B", "C"];
  const [textColor, setTextColor] = useState(""); // State to store the text color

  const backgroundColor = props.color;

  const handleMouseEnter = () => {
    setShowText(true);
  };

  const handleMouseLeave = () => {
    setShowText(false);
  };
  useEffect(() => {
    // Function to calculate the luminance of the color
    const calculateLuminance = (r, g, b) => {
      // Convert RGB values to linear values
      const sRGB = [r, g, b].map((val) => {
        val /= 255;
        return val <= 0.03928
          ? val / 12.92
          : Math.pow((val + 0.055) / 1.055, 2.4);
      });

      // Calculate luminance using relative luminance formula
      return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
    };

    // Convert hex color to RGB
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.substring(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
    };

    // Get RGB values from hex color
    const rgb = hexToRgb(backgroundColor);
    const luminance = calculateLuminance(rgb[0], rgb[1], rgb[2]);

    // Determine text color based on luminance
    const textColor = luminance > 0.5 ? "black" : "white";
    setTextColor(textColor);
  }, [backgroundColor]);

  return (
    <div
      className="tile"
      style={{ backgroundColor: props.color }}
      onClick={props.onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showText && (
        <span
          className="tile-text"
          style={{ backgroundColor, color: textColor }}
        >
          {/* {notes[props.noteIndex]}
          <br /> */}
          {props.color}
        </span>
      )}
    </div>
  );
}
