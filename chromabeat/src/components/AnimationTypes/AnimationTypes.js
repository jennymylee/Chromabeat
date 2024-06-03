import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import "./AnimationTypes.css";

export default function AnimationTypes(props) {
  const [value, setValue] = useState(0);

  const marks = [
    { value: 0, label: "leaf" },
    { value: 1, label: "burst" },
    { value: 2, label: "smoke" },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const labels = ["leaf", "burst", "smoke"];
    props.setAnimationType(labels[newValue]);
  };

  const CustomSlider = styled(Slider)({
    "& .MuiSlider-markLabel": {
      color: "grey", // Change this to the desired color
      fontSize: "1.2rem",
    },
  });

  useEffect(() => {
    // Ensure the component is mounted before any interaction
    const checkComponentMounted = () => {
      const sliderElement = document.querySelector(".MuiSlider-root");
      if (sliderElement) {
        return true;
      }
      return false;
    };

    if (!checkComponentMounted()) {
      console.error("Slider element is not mounted properly.");
    }
  }, []);

  return (
    <div className="animation-types">
      {props.animationType ? (
        <CustomSlider
          aria-label="Animation Type"
          onChange={handleChange}
          step={1}
          marks={marks}
          min={0}
          max={2}
          value={value}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
