import React, { useState } from "react";
import "./Knob.css";
// knob credit: https://codepen.io/bbx/pen/QBKYOy

const Knob = (props) => {
  const {
    size,
    numTicks,
    degrees,
    min,
    max,
    value,
    color, // knob & active tick color
    outlineColor, // outline of active tick color
    hue, // gradient inside the knob
    onChange,
  } = props;

  const fullAngle = degrees;
  const startAngle = (360 - degrees) / 2;
  const endAngle = startAngle + degrees;
  const margin = size * 0.15;

  // update the degree
  const [deg, setDeg] = useState(
    Math.floor(convertRange(min, max, startAngle, endAngle, value))
  );

  function convertRange(oldMin, oldMax, newMin, newMax, oldValue) {
    return (
      ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
    );
  }

  // handle dragging of the knob
  const startDrag = (e) => {
    e.preventDefault();
    const knob = e.target.closest(".knob").getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2,
    };

    const moveHandler = (e) => {
      const currentDeg = getDeg(e.clientX, e.clientY, pts);
      if (currentDeg === startAngle) {
        setDeg(currentDeg - 1);
      } else {
        const newValue = Math.floor(
          convertRange(startAngle, endAngle, min, max, currentDeg)
        );
        setDeg(currentDeg);
        onChange(newValue);
      }
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", moveHandler);
    });
  };

  // gets the degree the knob stopped at
  const getDeg = (cX, cY, pts) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let deg = (Math.atan(y / x) * 180) / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    let finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
    return finalDeg;
  };

  // renders the ticks based on provided ticks #
  const renderTicks = () => {
    let ticks = [];
    const incr = fullAngle / numTicks;
    const tickSize = margin + size / 2;
    for (let tickDeg = startAngle; tickDeg <= endAngle; tickDeg += incr) {
      const tickStyle = {
        height: tickSize + 10,
        left: tickSize - 1,
        top: tickSize + 2,
        transform: `rotate(${tickDeg}deg)`,
        transformOrigin: "top",
      };
      ticks.push(
        <div
          key={tickDeg}
          className={`tick ${tickDeg <= deg ? "active" : ""}`}
          style={tickStyle}
        />
      );
    }
    return ticks;
  };

  // knob style
  const kStyle = {
    width: size * 1.3,
    height: size * 1.3,
  };

  // inner knob style
  const iStyle = {
    width: size,
    height: size,
    "--knob-inner-grip-color": color,
  };

  // outer knob style
  const oStyle = {
    ...iStyle,
    margin: margin,
    backgroundImage: `radial-gradient(circle closest-side at 50% 50%, hsl(${hue}, ${deg}%, ${
      deg / 5
    }%), hsl(${hue}, 20%, ${deg / 36}%))`,
  };

  // tick style
  const tStyle = {
    "--active-tick-color": color,
    "--tick-outline-color": outlineColor || color,
  };

  iStyle.transform = `rotate(${deg}deg)`;

  return (
    <div className="knob" style={kStyle}>
      <div className="ticks" style={tStyle}>
        {numTicks ? renderTicks() : null}
      </div>
      <div className="knob outer" style={oStyle} onMouseDown={startDrag}>
        <div className="knob inner" style={iStyle}>
          <div className="grip" />
        </div>
      </div>
    </div>
  );
};

Knob.defaultProps = {
  size: 150,
  min: 10,
  max: 30,
  numTicks: 0,
  degrees: 270,
  value: 0,
  color: "#509eec",
  outlineColor: "#369",
  hue: 210,
};

export default Knob;
