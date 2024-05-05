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

  return (
    <div className={`color-picker ${isOpen ? "open" : ""}`}>
      <button onClick={toggleColorPicker}>
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
              <Tiles />
            </div>
            <div
              className="color-bar"
              style={{
                background: hsvaToHex(hsva),
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
