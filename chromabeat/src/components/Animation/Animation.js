import React, { useState, useEffect, useRef } from "react";
import "./Animation.css";

export default function Animation(props) {
  const [audioSource, setAudioSource] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (analyser) {
      animate(canvas, ctx);
    }

    return () => {
      // Clean up if needed
    };
  }, [analyser]);

  function handlePlay(event) {
    if (!analyser) {
      const audio1 = document.getElementById("audio1");
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audio1);
      const analyzer = audioContext.createAnalyser();
      source.connect(analyzer);
      analyzer.connect(audioContext.destination);
      analyzer.fftSize = 4096;
      const bufferLength = analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      setAudioSource(source);
      setAnalyser(analyzer);
      setDataArray(dataArray);
    }
  }

  React.useEffect(() => {
    if (analyser) {
      animate(canvasRef.current, canvasRef.current.getContext("2d"));
    }
  }, [analyser]);

  let x;
  const barWidth = 15;
  let barHeight;
  const bufferLength = analyser ? analyser.frequencyBinCount : 0;

  function animate(canvas, ctx) {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualiser(
      bufferLength,
      x,
      barWidth,
      barHeight,
      dataArray,
      ctx,
      canvas
    );
    requestAnimationFrame(() => animate(canvas, ctx)); // Pass canvas and ctx here
  }

  function drawVisualiser(
    bufferLength,
    x,
    barWidth,
    barHeight,
    dataArray,
    ctx,
    canvas
  ) {
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 2.5;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(i * 4.184);
      const hue = 120 + i * 0.05;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.beginPath();
      ctx.arc(0, barHeight / 2, barHeight / 2, 0, Math.PI / 4);
      ctx.fill();
      ctx.stroke();
      x += barWidth;
      ctx.restore();
    }
  }

  return (
    <div id="container">
      <canvas id="canvas1" ref={canvasRef}></canvas>
      <audio
        id="audio1"
        src={props.song.src}
        controls
        onPlay={handlePlay}
      ></audio>
    </div>
  );
}
