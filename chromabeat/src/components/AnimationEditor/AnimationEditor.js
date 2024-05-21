import "./AnimationEditor.css";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { IconButton } from "@mui/material";

export default function AnimationEditor() {
  const [visibleCircles, setVisibleCircles] = useState(false);
  const [label, setLabel] = useState(null);

  // click on the build or close icon
  const handleIconClick = () => {
    setVisibleCircles(!visibleCircles);
  };

  // click on circle to show label
  const handleClick = (desc) => {
    if (visibleCircles) {
      setLabel(desc);
    }
  };

  return (
    <div className="animation-editor">
      <div className="quarter-circle">
        <IconButton className="icon-btn" size="large" onClick={handleIconClick}>
          {visibleCircles ? <CloseIcon /> : <SettingsOutlinedIcon />}
        </IconButton>
      </div>
      {visibleCircles && (
        <>
          <div
            className="quarter-circle true"
            onClick={() => handleClick("circle 2")}
          ></div>
          <div
            className="quarter-circle true"
            onClick={() => handleClick("circle 3")}
          ></div>
        </>
      )}
      {label && <div className="label">{label}</div>}
    </div>
  );
}
