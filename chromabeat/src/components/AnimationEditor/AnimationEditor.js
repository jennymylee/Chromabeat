import "./AnimationEditor.css";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function AnimationEditor() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCircles, setVisibleCircles] = useState(false);
  const [label, setLabel] = useState(null);

  // click on circle 1
  const handleFirstCircleClick = () => {
    if (!visibleCircles) {
      setVisibleCircles(true); // if circles aren't visible, clicking shows the circles
    }
    setLabel("circle 1"); // if circles are visible, clicking shows the label
  };

  // click on circles 2 & 3
  const handleClick = (desc) => {
    setLabel(desc);
  };

  // close the editor
  const closeEditor = () => {
    setIsOpen(!isOpen);
    setLabel(null);
  };

  return (
    <div className="animation-editor">
      {/* <button className="close-btn" onClick={closeEditor}>
        <CloseIcon />
      </button> */}
      <div className="quarter-circle" onClick={handleFirstCircleClick}></div>
      <div
        className={`quarter-circle ${visibleCircles ? "true" : ""}`} // visible if true
        onClick={() => handleClick("circle 2")}
      ></div>
      <div
        className={`quarter-circle ${visibleCircles ? "true" : ""}`} // visible if true
        onClick={() => handleClick("circle 3")}
      ></div>
    </div>
  );
}
