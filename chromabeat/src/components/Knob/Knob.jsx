import React, { useState, useEffect } from "react";
import "./Knob.css";

const Knob = ({
  blurValue,
  setBlurValue,
  opacityValue,
  setOpacityValue,
  bottomSize,
  topSize,
  numTicks,
  degrees,
  min,
  max,
  bottomColor,
  bottomOutlineColor,
  bottomHue,
  topColor,
  topOutlineColor,
  topHue,
  onChange,
}) => {
  const fullAngle = degrees;
  const startAngle = (360 - degrees) / 2;
  const endAngle = startAngle + degrees;
  const bottomMargin = bottomSize * 0.15;
  const topMargin = topSize * 0.15;

  // Initialize bottomDeg to the endAngle (highest value)
  const [bottomDeg, setBottomDeg] = useState(endAngle);
  const [opacity, setOpacity] = useState(max);

  // Initialize topDeg to the startAngle (lowest value)
  const [topDeg, setTopDeg] = useState(startAngle);
  const [blur, setBlur] = useState(min);

  useEffect(() => {
    setOpacityValue(opacity);
    setBlurValue(blur);
  }, [opacity, blur, setOpacityValue, setBlurValue]);

  function convertRange(oldMin, oldMax, newMin, newMax, oldValue) {
    return (
      ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
    );
  }

  const startDrag = (e, setDeg, knobType) => {
    e.preventDefault();
    const knob = e.target.closest(`.${knobType}`).getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2,
    };

    const moveHandler = (e) => {
      const currentDeg = getDeg(e.clientX, e.clientY, pts);
      const newValue = Math.floor(
        convertRange(startAngle, endAngle, min, max, currentDeg)
      );
      setDeg(currentDeg);

      if (knobType === "bottom-knob") {
        setOpacity(newValue);
        setOpacityValue(newValue);
      } else if (knobType === "top-knob") {
        setBlur(newValue);
        setBlurValue(newValue);
      }
      onChange(newValue);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", moveHandler);
    });
  };

  const getDeg = (cX, cY, pts) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let deg = (Math.atan(y / x) * 180) / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    return Math.min(Math.max(startAngle, deg), endAngle);
  };

  const renderTicks = (knob, deg) => {
    let ticks = [];
    const incr = fullAngle / numTicks;
    const tickLength = knob === "bottom" ? 35 : 45;
    const tickSize =
      knob === "bottom"
        ? bottomMargin + bottomSize / 2
        : topMargin + topSize / 2;
    for (let tickDeg = startAngle; tickDeg <= endAngle; tickDeg += incr) {
      const tickStyle = {
        height: tickSize + tickLength,
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

  const kStyle = {
    width: bottomSize * 1.3,
    height: bottomSize * 1.3,
  };

  const iStyle = {
    width: bottomSize,
    height: bottomSize,
    "--knob-bottom-inner-grip-color": bottomColor,
  };

  const oStyle = {
    ...iStyle,
    margin: bottomMargin,
    backgroundImage: `radial-gradient(circle closest-side at 50% 50%, hsl(${bottomHue}, ${bottomDeg}%, ${
      bottomDeg / 5
    }%), hsl(${bottomHue}, 20%, ${bottomDeg / 36}%))`,
  };

  const tStyle = {
    "--active-tick-bottomColor": bottomColor,
    "--tick-outline-bottomColor": bottomOutlineColor || bottomColor,
  };

  iStyle.transform = `rotate(${bottomDeg}deg)`;

  const tkStyle = {
    width: topSize * 1.3,
    height: topSize * 1.3,
  };

  const tiStyle = {
    width: topSize,
    height: topSize,
    "--knob-top-inner-grip-color": topColor,
  };

  const toStyle = {
    ...tiStyle,
    margin: topMargin,
    backgroundImage: `radial-gradient(circle closest-side at 50% 50%, hsl(${topHue}, ${topDeg}%, ${
      topDeg / 5
    }%), hsl(${topHue}, 20%, ${topDeg / 36}%))`,
  };

  const ttStyle = {
    "--active-tick-topColor": topColor,
    "--tick-outline-topColor": topOutlineColor || topColor,
  };

  tiStyle.transform = `rotate(${topDeg}deg)`;

  const circle = {
    height: bottomSize * 1.5,
    width: bottomSize * 1.5,
  };

  return (
    <div className="knob-and-properties">
      <div className="knob-container">
        <div className="bottom ticks" style={tStyle}>
          {numTicks ? renderTicks("bottom", bottomDeg) : null}
        </div>
        <div className="circle" style={circle}></div>
        <div className="top ticks" style={ttStyle}>
          {numTicks ? renderTicks("top", topDeg) : null}
        </div>
        <div className="bottom-knob" style={kStyle}>
          <div
            className="knob outer"
            style={oStyle}
            onMouseDown={(e) => startDrag(e, setBottomDeg, "bottom-knob")}
          >
            <div className="knob inner" style={iStyle}>
              <div className="grip" />
            </div>
          </div>
        </div>
        <div className="top-knob" style={tkStyle}>
          <div
            className="knob outer"
            style={toStyle}
            onMouseDown={(e) => startDrag(e, setTopDeg, "top-knob")}
          >
            <div className="knob inner" style={tiStyle}>
              <div className="grip" />
            </div>
          </div>
        </div>
        <div className="properties-label">
          <p className="property">Blur: {blurValue}</p>
          <p className="property">Opacity: {opacityValue}</p>
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
  numTicks: 25,
  degrees: 270,
  bottomColor: "#509eec",
  bottomOutlineColor: "#369",
  bottomHue: 210,
  topColor: "#e61c36",
  topOutlineColor: "#e67cb1",
  topHue: 0,
};

export default Knob;
