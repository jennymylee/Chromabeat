import React, { useState } from "react";
import "./Knob.css";
// knob credit: https://codepen.io/bbx/pen/QBKYOy

const Knob = ({
  bottomSize,
  topSize,
  numTicks,
  degrees,
  min,
  max,
  value,
  color, // knob & active tick color
  outlineColor, // outline of active tick color
  hue, // gradient inside the knob
  onChange,
}) => {
  const fullAngle = degrees;
  const startAngle = (360 - degrees) / 2;
  const endAngle = startAngle + degrees;
  const bottomMargin = bottomSize * 0.15;
  const topMargin = topSize * 0.15;

  // update the degree
  const [bottomDeg, setBottomDeg] = useState(
    Math.floor(convertRange(min, max, startAngle, endAngle, value))
  );

  // update the degree
  const [topDeg, setTopDeg] = useState(
    Math.floor(convertRange(min, max, startAngle, endAngle, value))
  );

  function convertRange(oldMin, oldMax, newMin, newMax, oldValue) {
    return (
      ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
    );
  }

  // handle dragging of the knob
  const startDrag = (e, setDeg, knobType) => {
    e.preventDefault();
    const knob = e.target.closest(`.${knobType}`).getBoundingClientRect();

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
  const renderTicks = (knob, deg) => {
    let ticks = [];
    const incr = fullAngle / numTicks;
    const tickSize =
      knob === "bottom"
        ? bottomMargin + bottomSize / 2
        : topMargin + topSize / 2;
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

  // BOTTOM KNOB
  const kStyle = {
    width: bottomSize * 1.3,
    height: bottomSize * 1.3,
  };

  const iStyle = {
    width: bottomSize,
    height: bottomSize,
    "--knob-bottom-inner-grip-color": color,
  };

  const oStyle = {
    ...iStyle,
    margin: bottomMargin,
    backgroundImage: `radial-gradient(circle closest-side at 50% 50%, hsl(${hue}, ${bottomDeg}%, ${
      bottomDeg / 5
    }%), hsl(${hue}, 20%, ${bottomDeg / 36}%))`,
  };

  const tStyle = {
    "--active-tick-color": color,
    "--tick-outline-color": outlineColor || color,
  };

  iStyle.transform = `rotate(${bottomDeg}deg)`;

  // TOP KNOB
  const tkStyle = {
    width: topSize * 1.3,
    height: topSize * 1.3,
  };

  const tiStyle = {
    width: topSize,
    height: topSize,
    "--knob-bottom-inner-grip-color": color,
  };

  const toStyle = {
    ...tiStyle,
    margin: topMargin,
    backgroundImage: `radial-gradient(circle closest-side at 50% 50%, hsl(${hue}, ${topDeg}%, ${
      topDeg / 5
    }%), hsl(${hue}, 20%, ${topDeg / 36}%))`,
  };

  const ttStyle = {
    "--active-tick-color": color,
    "--tick-outline-color": outlineColor || color,
  };

  tiStyle.transform = `rotate(${topDeg}deg)`;

  return (
    <div className="knob-container">
      <div className="ticks" style={tStyle}>
        {numTicks ? renderTicks("bottom", bottomDeg) : null}{" "}
      </div>
      <div className="bottom-knob" style={kStyle}>
        <div
          className="knob bottom-outer"
          style={oStyle}
          onMouseDown={(e) => startDrag(e, setBottomDeg, "bottom-knob")}
        >
          <div className="knob bottom-inner" style={iStyle}>
            <div className="grip" />
          </div>
        </div>
      </div>
      <div className="top-knob" style={tkStyle}>
        <div
          className="knob bottom-outer"
          style={toStyle}
          onMouseDown={(e) => startDrag(e, setTopDeg, "top-knob")}
        >
          <div className="knob bottom-inner" style={tiStyle}>
            <div className="grip" />
          </div>
        </div>
      </div>
    </div>
  );
};

Knob.defaultProps = {
  bottomSize: 150,
  topSize: 100,
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
