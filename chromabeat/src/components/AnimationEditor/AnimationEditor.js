import "./AnimationEditor.css";
import React, { useState } from "react";
import Knob from "../Knob/Knob";
// knob credit: https://codepen.io/bbx/pen/QBKYOy

export default function AnimationEditor() {
  const [pointers, setPointers] = useState([{ value: 0 }, { value: 20 }]);

  const handleKnobChange = (index, newValue) => {
    const newPointers = [...pointers];
    newPointers[index].value = newValue;
    setPointers(newPointers);
  };

  return (
    <div className="knob-container">
      <Knob
        bottomSize={150}
        topSize={100}
        numTicks={25}
        degrees={260}
        min={1}
        max={100}
        value={pointers[1].value}
        color={"pink"}
        outlineColor={"purple"}
        hue={"330"}
        onChange={(value) => handleKnobChange(1, value)}
      />
    </div>
  );
}
