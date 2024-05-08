import React, { useState } from "react";
import "./Animation.css";

export default function Animation(props) {
  const [audioSource, setAudioSource] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [dataArray, setDataArray] = useState(null);

  function handlePlay(event) {
    const audio1 = document.getElementById("audio1");
    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audio1);
    const analyzer = audioContext.createAnalyser();
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);
    analyzer.fftSize = 128;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    setAudioSource(source);
    setAnalyser(analyzer);
    setDataArray(dataArray);
  }

  //   function handleFileChange(event) {
  //     const files = event.target.files;
  //     const audio1 = document.getElementById("audio1");
  //     // audio1.src = URL.createObjectURL(files[0]);
  //     audio1.src = props.song.src;
  //     audio1.load();
  //     audio1.play();

  //     const audioContext = new AudioContext();
  //     const source = audioContext.createMediaElementSource(audio1);
  //     const analyzer = audioContext.createAnalyser();
  //     source.connect(analyzer);
  //     analyzer.connect(audioContext.destination);
  //     analyzer.fftSize = 128;
  //     const bufferLength = analyzer.frequencyBinCount;
  //     const dataArray = new Uint8Array(bufferLength);
  //     setAudioSource(source);
  //     setAnalyser(analyzer);
  //     setDataArray(dataArray);
  //   }

  React.useEffect(() => {
    if (analyser) {
      animate();
    }
  }, [analyser]);

  function animate() {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    const bufferLength = analyser.frequencyBinCount;
    const barWidth = 15;

    function drawVisualiser() {
      let x = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(dataArray);
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 1.2;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((i * Math.PI * 4) / bufferLength);
        const hue = 240 + i * 1.5;
        ctx.lineWidth = barHeight / 10;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, barHeight);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, barHeight + barHeight / 5, barHeight / 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, barHeight + barHeight / 2, barHeight / 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(drawVisualiser);
    }
    drawVisualiser();
  }

  return (
    <div id="container">
      <canvas id="canvas1"></canvas>
      <audio
        id="audio1"
        src={props.song.src}
        controls
        onPlay={handlePlay}
      ></audio>
      {/* <input
        type="file"
        id="fileupload"
        accept="audio/*"
        onChange={handleFileChange}
      /> */}
    </div>
  );
}
