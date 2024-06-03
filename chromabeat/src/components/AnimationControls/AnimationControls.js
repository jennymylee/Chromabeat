// ./components/AnimationControls/AnimationControls.js
import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AnimationEditor from "../AnimationEditor/AnimationEditor";
import AnimationTypes from "../AnimationTypes/AnimationTypes";

const AnimationControls = ({
  isAnimationControlsOpen,
  toggleAnimationControls,
  animationType,
  setAnimationType,
}) => {
  return (
    <div
      className={`animation-controls ${isAnimationControlsOpen ? "open" : ""}`}
    >
      <div className="animation-controls-tab">
        <div className="animation-controls-label">Animation Controls</div>
        <button className="tab" onClick={toggleAnimationControls}>
          {isAnimationControlsOpen ? (
            <ArrowDropDownIcon
              style={{ color: "grey" }}
              sx={{ fontSize: "32px" }}
            />
          ) : (
            <ArrowDropUpIcon
              style={{ color: "grey" }}
              sx={{ fontSize: "32px" }}
            />
          )}
        </button>
      </div>
      {isAnimationControlsOpen && (
        <div className="animation-expanded">
          <AnimationEditor />
          <AnimationTypes
            animationType={animationType}
            setAnimationType={setAnimationType}
          />
        </div>
      )}
    </div>
  );
};

export default AnimationControls;
