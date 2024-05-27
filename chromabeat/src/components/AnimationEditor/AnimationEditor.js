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
    <div className="animation-editor">
      <div className="knob-container">
        <div className="knob2">
          <Knob
            size={150}
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
        <div className="knob1">
          <Knob
            size={80}
            numTicks={25}
            degrees={260}
            min={1}
            max={100}
            value={pointers[0].value}
            color={"yellow"}
            outlineColor={"red"}
            hue={"60"}
            onChange={(value) => handleKnobChange(0, value)}
          />
        </div>
      </div>
    </div>
  );
}
