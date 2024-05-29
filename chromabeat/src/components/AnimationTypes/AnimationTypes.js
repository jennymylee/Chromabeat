import React, { useState } from "react";
import "./AnimationTypes.css";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

export default function AnimationTypes(props) {
  const [value, setValue] = useState(0);

  const marks = [
    {
      value: 0,
      label: "leaf",
    },
    {
      value: 1,
      label: "burst",
    },
    {
      value: 2,
      label: "smoke",
    },
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

  return (
    <div className="animation-types">
      <CustomSlider
        aria-label="Animation Type"
        onChange={handleChange}
        step={1}
        marks={marks}
        min={0}
        max={2}
      />
    </div>
  );
}
