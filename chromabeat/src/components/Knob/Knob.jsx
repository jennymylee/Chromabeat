import React, { useState } from "react";
import "./Knob.css";
// knob credit: https://codepen.io/bbx/pen/QBKYOy

const Knob = (props) => {
  const {
    outerSize,
    innerSize,
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
  const outerMargin = outerSize * 0.15;
  const innerMargin = innerSize * 15;

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

  // handle dragging of the bottom knob
  const startBottomDrag = (e) => {
    e.preventDefault();
    const knob = e.target.closest(".bottom-knob").getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2,
    };

    const moveHandler = (e) => {
      const currentDeg = getBottomDeg(e.clientX, e.clientY, pts);
      if (currentDeg === startAngle) {
        setBottomDeg(currentDeg - 1);
      } else {
        const newValue = Math.floor(
          convertRange(startAngle, endAngle, min, max, currentDeg)
        );
        setBottomDeg(currentDeg);
        onChange(newValue);
      }
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", moveHandler);
    });
  };

  // handle dragging of the top knob
  const startTopDrag = (e) => {
    e.preventDefault();
    const knob = e.target.closest(".top-knob").getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2,
    };

    const moveHandler = (e) => {
      const currentDeg = getTopDeg(e.clientX, e.clientY, pts);
      if (currentDeg === startAngle) {
        setTopDeg(currentDeg - 1);
      } else {
        const newValue = Math.floor(
          convertRange(startAngle, endAngle, min, max, currentDeg)
        );
        setTopDeg(currentDeg);
        onChange(newValue);
      }
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", moveHandler);
    });
  };

  // gets the degree the knob stopped at
  const getBottomDeg = (cX, cY, pts) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let bottomDeg = (Math.atan(y / x) * 180) / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      bottomDeg += 90;
    } else {
      bottomDeg += 270;
    }
    let finalDeg = Math.min(Math.max(startAngle, bottomDeg), endAngle);
    return finalDeg;
  };

  const getTopDeg = (cX, cY, pts) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let topDeg = (Math.atan(y / x) * 180) / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      topDeg += 90;
    } else {
      topDeg += 270;
    }
    let finalDeg = Math.min(Math.max(startAngle, topDeg), endAngle);
    return finalDeg;
  };

  // renders the ticks based on provided ticks #
  const renderTicks = (knob) => {
    let ticks = [];
    const incr = fullAngle / numTicks;
    let tickSize = "0";
    if ((knob = "bottom")) {
      tickSize = outerMargin + outerSize / 2;
    } else {
      tickSize = innerMargin + innerSize / 2;
    }
    for (let tickDeg = startAngle; tickDeg <= endAngle; tickDeg += incr) {
      const tickStyle = {
        height: tickSize + 10,
        left: tickSize - 1,
        top: tickSize + 2,
        transform: `rotate(${tickDeg}deg)`,
        transformOrigin: "top",
      };
      if ((knob = "bottom")) {
        ticks.push(
          <div
            key={tickDeg}
            className={`tick ${tickDeg <= bottomDeg ? "active" : ""}`}
            style={tickStyle}
          />
        );
      } else {
        ticks.push(
          <div
            key={tickDeg}
            className={`tick ${tickDeg <= topDeg ? "active" : ""}`}
            style={tickStyle}
          />
        );
      }
    }
    return ticks;
  };

  // BOTTOM KNOB
  const kStyle = {
    width: outerSize * 1.3,
    height: outerSize * 1.3,
  };

  const iStyle = {
    width: outerSize,
    height: outerSize,
    "--knob-bottom-inner-grip-color": color,
  };

  const oStyle = {
    ...iStyle,
    margin: outerMargin,
    backgroundImage: `radial-gradient(circle closest-side at 50% 50%, hsl(${hue}, ${bottomDeg}%, ${
      bottomDeg / 5
    }%), hsl(${hue}, 20%, ${bottomDeg / 36}%))`,
  };

  const tStyle = {
    "--active-tick-color": color,
    "--tick-outline-color": outlineColor || color,
  };

  iStyle.transform = `rotate(${bottomDeg}bottomDeg)`;

  // TOP KNOB
  const tkStyle = {
    width: innerSize * 1.3,
    height: innerSize * 1.3,
  };

  const tiStyle = {
    width: innerSize,
    height: innerSize,
    "--knob-bottom-inner-grip-color": color,
  };

  const toStyle = {
    ...tiStyle,
    margin: innerMargin,
    backgroundImage: `radial-gradient(circle closest-side at 50% 50%, hsl(${hue}, ${topDeg}%, ${
      topDeg / 5
    }%), hsl(${hue}, 20%, ${topDeg / 36}%))`,
  };

  const ttStyle = {
    "--active-tick-color": color,
    "--tick-outline-color": outlineColor || color,
  };

  tiStyle.transform = `rotate(${topDeg}topDeg)`;

  return (
    <div className="knob-container">
      <div className="ticks" style={tStyle}>
        {numTicks ? renderTicks("bottom") : null}
      </div>
      <div className="bottom-knob" style={kStyle}>
        <div
          className="bottom-outer"
          style={oStyle}
          onMouseDown={startBottomDrag}
        >
          <div className="bottom-inner" style={iStyle}>
            <div className="grip" />
          </div>
        </div>
      </div>
      <div className="top-knob" style={tkStyle}>
        <div
          className="knob bottom-outer"
          style={toStyle}
          onMouseDown={startTopDrag}
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
  outerSize: 150,
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
