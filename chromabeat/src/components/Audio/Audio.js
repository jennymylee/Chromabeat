import { useRef, useEffect, useState } from "react";
import "./Animation.css";

export default function Audio(props) {
  const audio = useRef(null);

  useEffect(() => {
    if (audio.current) {
      //console.log("audio ref:", audio.current);
      const updateProgress = () => {
        if (props.handleProgress) {
          props.handleProgress({
            // sets dur & cur time
            dur: audio.current.duration,
            curTime: audio.current.currentTime,
          });
        }
      };

      // get dur & cur time
      audio.current.addEventListener("loadedmetadata", updateProgress);
      audio.current.addEventListener("timeupdate", updateProgress);

      // remove event listener
      return () => {
        audio.current.removeEventListener("loadedmetadata", updateProgress);
        audio.current.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [props.handleProgress, props.song]); // dependency array

  useEffect(() => {
    if (audio.current && props.isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [props.isPlaying, props.song]); // dependency array

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

  useEffect(() => {
    if (analyser) {
      animate(canvasRef.current, canvasRef.current.getContext("2d"));
    }
  }, [analyser, props.tileColors]);

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
    const tileColors = props.tileColors; // Save tileColors in a local variable
    let colorIndex = 0; // Initialize color index
    let barsPerColor = 50; // Number of bars per color (adjust as needed)
    let barsDrawn = 0; // Counter for bars drawn with current color

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 2.5;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(i * 4.184);
      const hue = (i / bufferLength) * 360; // Adjust hue based on frequency data

      // Use the same tile color for multiple bars
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`; // Set dynamic hue
      ctx.fillStyle = tileColors[colorIndex]; // Override with tile color
      ctx.beginPath();
      ctx.arc(0, barHeight / 2, barHeight / 2, 0, Math.PI / 4);
      ctx.fill();
      ctx.stroke();
      x += barWidth;

      barsDrawn++;

      if (barsDrawn === barsPerColor) {
        colorIndex = (colorIndex + 1) % tileColors.length; // Move to the next color
        barsDrawn = 0; // Reset bars drawn counter
      }

      ctx.restore();
    }
  }

  return (
    <div id="container">
      <canvas id="canvas1" ref={canvasRef}></canvas>
      <audio
        id="audio1"
        src={props.song.src}
        // controls
        ref={audio}
        onPlay={handlePlay}
      ></audio>
    </div>
  );
}
