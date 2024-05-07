import "./ColorPicker.css";
import React, { useState, useRef, useEffect } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";
import Tiles from "../Tiles/Tiles";

export default function ColorPicker() {
  const [isOpen, setIsOpen] = useState(true);
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const wheelWrapperRef = useRef(null);
  const [wheelSize, setWheelSize] = useState(0); // Initialize with 0
  const [tileColors, setTileColors] = useState(Array(8).fill("#ccc")); // start w 8 gray tiles

  useEffect(() => {
    const updateWheelSize = () => {
      const wheelWrapperWidth = wheelWrapperRef.current.clientWidth - 10;
      setWheelSize(wheelWrapperWidth); // Set the wheel size to the width of the wrapper
    };

    updateWheelSize(); // Call the function once to set the initial size
    window.addEventListener("resize", updateWheelSize); // Update the size on window resize

    return () => {
      window.removeEventListener("resize", updateWheelSize); // Cleanup event listener
    };
  }, []);

  const toggleColorPicker = () => {
    setIsOpen(!isOpen);
  };

  // gets index of tile in array to set the tile color
  const setColor = (index) => {
    setTileColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = hsvaToHex(hsva);
      //console.log("new tileColors:", newColors);
      return newColors;
    });
  };

  // Generate the gradient background CSS string
  const gradientBackground = `linear-gradient(to bottom, ${tileColors.join(
    ", "
  )})`;

  // Style object for the bar element
  const barStyle = {
    background: gradientBackground,
  };

  const [textColor, setTextColor] = useState(""); // State to store the selected text color
  const backgroundColor = hsvaToHex(hsva);
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
    <div className={`color-picker ${isOpen ? "open" : ""}`}>
      <button className="tab" onClick={toggleColorPicker}>
        {isOpen ? (
          <ArrowRightIcon style={{ color: "grey" }} sx={{ fontSize: "32px" }} />
        ) : (
          <ArrowLeftIcon style={{ color: "grey" }} sx={{ fontSize: "32px" }} />
        )}
      </button>
      {isOpen && (
        <div className="expanded">
          <p className="title">Colors</p>
          <div className="content">
            <div className="left">
              <div className="wheel-wrapper" ref={wheelWrapperRef}>
                <Wheel
                  color={hsva}
                  width={wheelSize} // Use wheelSize as width
                  height={wheelSize} // Use wheelSize as height
                  onChange={(color) => setHsva({ ...hsva, ...color.hsva })}
                />
              </div>
              <div className="selected-container">
                <p className="selected-label">color selected:</p>
                <div
                  className="color-selected"
                  style={{
                    background: hsvaToHex(hsva),
                    backgroundColor,
                    color: textColor,
                  }}
                >
                  {hsvaToHex(hsva)}
                </div>
              </div>
              <Tiles tileColors={tileColors} setColor={setColor} />
            </div>

            <div className="color-bar" style={barStyle}></div>
          </div>
        </div>
      )}
    </div>
  );
}
