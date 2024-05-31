// import React, { useState } from "react";
// import "./Knob.css";
// // knob credit: https://codepen.io/bbx/pen/QBKYOy

// const Knob = ({
//   bottomSize,
//   topSize,
//   numTicks,
//   degrees,
//   min,
//   max,
//   value,
//   bottomColor,
//   bottomOutlineColor,
//   bottomHue,
//   topColor,
//   topOutlineColor,
//   topHue,
//   onChange,
// }) => {
//   const fullAngle = degrees;
//   const startAngle = (360 - degrees) / 2;
//   const endAngle = startAngle + degrees;
//   const bottomMargin = bottomSize * 0.15;
//   const topMargin = topSize * 0.15;

//   // update the degree
//   const [bottomDeg, setBottomDeg] = useState(
//     Math.floor(convertRange(min, max, startAngle, endAngle, value))
//   );

//   // update the degree
//   const [topDeg, setTopDeg] = useState(
//     Math.floor(convertRange(min, max, startAngle, endAngle, value))
//   );

//   function convertRange(oldMin, oldMax, newMin, newMax, oldValue) {
//     return (
//       ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
//     );
//   }

//   // handle dragging of the knob
//   const startDrag = (e, setDeg, knobType) => {
//     e.preventDefault();
//     const knob = e.target.closest(`.${knobType}`).getBoundingClientRect();

//     const pts = {
//       x: knob.left + knob.width / 2,
//       y: knob.top + knob.height / 2,
//     };

//     const moveHandler = (e) => {
//       const currentDeg = getDeg(e.clientX, e.clientY, pts);
//       if (currentDeg === startAngle) {
//         setDeg(currentDeg - 1);
//       } else {
//         const newValue = Math.floor(
//           convertRange(startAngle, endAngle, min, max, currentDeg)
//         );
//         setDeg(currentDeg);
//         onChange(newValue);
//       }
//     };

//     document.addEventListener("mousemove", moveHandler);
//     document.addEventListener("mouseup", () => {
//       document.removeEventListener("mousemove", moveHandler);
//     });
//   };

//   // gets the degree the knob stopped at
//   const getDeg = (cX, cY, pts) => {
//     const x = cX - pts.x;
//     const y = cY - pts.y;
//     let deg = (Math.atan(y / x) * 180) / Math.PI;
//     if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
//       deg += 90;
//     } else {
//       deg += 270;
//     }
//     let finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
//     return finalDeg;
//   };

//   // renders the ticks based on provided ticks #
//   const renderTicks = (knob, deg) => {
//     let ticks = [];
//     const incr = fullAngle / numTicks;
//     const tickLength = knob === "bottom" ? 30 : 10;
//     const tickSize =
//       knob === "bottom"
//         ? bottomMargin + bottomSize / 2
//         : topMargin + topSize / 2;
//     for (let tickDeg = startAngle; tickDeg <= endAngle; tickDeg += incr) {
//       const tickStyle = {
//         height: tickSize + tickLength,
//         left: tickSize - 1,
//         top: tickSize + 2,
//         transform: `rotate(${tickDeg}deg)`,
//         transformOrigin: "top",
//       };
//       ticks.push(
//         <div
//           key={tickDeg}
//           className={`tick ${tickDeg <= deg ? "active" : ""}`}
//           style={tickStyle}
//         />
//       );
//     }
//     return ticks;
//   };

//   // BOTTOM KNOB
//   const kStyle = {
//     width: bottomSize * 1.3,
//     height: bottomSize * 1.3,
//   };

//   const iStyle = {
//     width: bottomSize,
//     height: bottomSize,
//     "--knob-bottom-inner-grip-color": bottomColor,
//   };

//   const oStyle = {
//     ...iStyle,
//     margin: bottomMargin,
//     backgroundImage: `radial-gradient(circle closest-side at 50% 50%, hsl(${bottomHue}, ${bottomDeg}%, ${
//       bottomDeg / 5
//     }%), hsl(${bottomHue}, 20%, ${bottomDeg / 36}%))`,
//   };

//   const tStyle = {
//     "--active-tick-bottomColor": bottomColor,
//     "--tick-outline-bottomColor": bottomOutlineColor || bottomColor,
//   };

//   iStyle.transform = `rotate(${bottomDeg}deg)`;

//   // TOP KNOB
//   const tkStyle = {
//     width: topSize * 1.3,
//     height: topSize * 1.3,
//   };

//   const tiStyle = {
//     width: topSize,
//     height: topSize,
//     "--knob-top-inner-grip-color": topColor,
//   };

//   const toStyle = {
//     ...tiStyle,
//     margin: topMargin,
//     backgroundImage: `radial-gradient(circle closest-side at 50% 50%, hsl(${topHue}, ${topDeg}%, ${
//       topDeg / 5
//     }%), hsl(${topHue}, 20%, ${topDeg / 36}%))`,
//   };

//   const ttStyle = {
//     "--active-tick-topColor": topColor,
//     "--tick-outline-topColor": topOutlineColor || topColor,
//   };

//   tiStyle.transform = `rotate(${topDeg}deg)`;

//   const circle = {
//     height: bottomSize * 1.5,
//     width: bottomSize * 1.5,
//   };

//   return (
//     <div className="knob-container">
//       <div className="bottom ticks" style={tStyle}>
//         {numTicks ? renderTicks("bottom", bottomDeg) : null}
//       </div>
//       <div className="circle" style={circle}></div>
//       <div className="top ticks" style={ttStyle}>
//         {numTicks ? renderTicks("top", topDeg) : null}
//       </div>
//       <div className="bottom-knob" style={kStyle}>
//         <div
//           className="knob outer"
//           style={oStyle}
//           onMouseDown={(e) => startDrag(e, setBottomDeg, "bottom-knob")}
//         >
//           <div className="knob inner" style={iStyle}>
//             <div className="grip" />
//           </div>
//         </div>
//       </div>
//       <div className="top-knob" style={tkStyle}>
//         <div
//           className="knob outer"
//           style={toStyle}
//           onMouseDown={(e) => startDrag(e, setTopDeg, "top-knob")}
//         >
//           <div className="knob inner" style={tiStyle}>
//             <div className="grip" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Knob.defaultProps = {
//   bottomSize: 150,
//   topSize: 100,
//   min: 10,
//   max: 30,
//   numTicks: 25,
//   degrees: 270,
//   value: 0,
//   bottomColor: "#509eec",
//   bottomOutlineColor: "#369",
//   bottomHue: 210,
//   topColor: "#e61c36",
//   topOutlineColor: "#e67cb1",
//   topHue: 0,
// };

// export default Knob;
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
    const tickLength = knob === "bottom" ? 45 : 55;
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

  // BOTTOM KNOB
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

  // TOP KNOB
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
  value: 0,
  bottomColor: "#509eec",
  bottomOutlineColor: "#369",
  bottomHue: 210,
  topColor: "#e61c36",
  topOutlineColor: "#e67cb1",
  topHue: 0,
};

export default Knob;
