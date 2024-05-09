import "./AnimationEditor.css";
import React, { useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function AnimationEditor() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAnimationPicker = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`animation-editor ${isOpen ? "open" : ""}`}>
      {isOpen && (
        <div className="expanded">
          <p className="title">Animation</p>
          <div className="content"></div>
        </div>
      )}
      <button className="tab" onClick={toggleAnimationPicker}>
        {isOpen ? (
          <ArrowLeftIcon style={{ color: "grey" }} sx={{ fontSize: "32px" }} />
        ) : (
          <ArrowRightIcon style={{ color: "grey" }} sx={{ fontSize: "32px" }} />
        )}
      </button>
    </div>
  );
}
