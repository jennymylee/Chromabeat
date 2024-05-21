import { useRef, useEffect, useState } from "react";
import "./Animation.css";

export default function Audio(props) {
  const audio = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (audio.current) {
      const updateProgress = () => {
        if (props.handleProgress) {
          props.handleProgress({
            dur: audio.current.duration,
            curTime: audio.current.currentTime,
          });
        }
      };

      audio.current.addEventListener("loadedmetadata", updateProgress);
      audio.current.addEventListener("timeupdate", updateProgress);

      return () => {
        audio.current.removeEventListener("loadedmetadata", updateProgress);
        audio.current.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [props.handleProgress, props.song]);

  useEffect(() => {
    if (audio.current && props.isPlaying) {
      audio.current.play();
      setIsAnimating(true);
    } else {
      audio.current.pause();
      setIsAnimating(false);
    }
  }, [props.isPlaying, props.song]);

  const [audioSource, setAudioSource] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    if (analyser && isAnimating) {
      const render = () => {
        animate(canvas, ctx);
        animationFrameId = requestAnimationFrame(render);
      };
      render();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [analyser, isAnimating]);

  function handlePlay(event) {
    if (!analyser) {
      const audio1 = document.getElementById("audio1");
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audio1);
      const analyzer = audioContext.createAnalyser();
      source.connect(analyzer);
      analyzer.connect(audioContext.destination);
      if (props.animationType === "leaf") {
        analyzer.fftSize = 4096;
      } else {
        analyzer.fftSize = 512;
      }

      const bufferLength = analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      setAudioSource(source);
      setAnalyser(analyzer);
      setDataArray(dataArray);
    }
  }

  const barWidth = 15;
  let barHeight;
  const bufferLength = analyser ? analyser.frequencyBinCount : 0;

  function animate(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);

    switch (props.animationType) {
      case "leaf":
        drawLeaf(bufferLength, barWidth, barHeight, dataArray, ctx, canvas);
        break;
      case "burst":
        drawBurst(bufferLength, barWidth, barHeight, dataArray, ctx, canvas);
        break;
      case "smoke":
        drawSmoke(bufferLength, barWidth, barHeight, dataArray, ctx, canvas);
        break;
      default:
        drawLeaf(bufferLength, barWidth, barHeight, dataArray, ctx, canvas);
        break;
    }
  }

  function drawLeaf(bufferLength, barWidth, barHeight, dataArray, ctx, canvas) {
    const tileColors = props.tileColors;
    let colorIndex = 0;
    let barsPerColor = 50;
    let barsDrawn = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 2.5;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(i * 4.184);
      const hue = (i / bufferLength) * 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.fillStyle = tileColors[colorIndex];
      ctx.beginPath();
      ctx.arc(0, barHeight / 2, barHeight / 2, 0, Math.PI / 4);
      ctx.fill();
      ctx.stroke();

      barsDrawn++;
      if (barsDrawn === barsPerColor) {
        colorIndex = (colorIndex + 1) % tileColors.length;
        barsDrawn = 0;
      }

      ctx.restore();
    }
  }

  function drawBurst(
    bufferLength,
    barWidth,
    barHeight,
    dataArray,
    ctx,
    canvas
  ) {
    const tileColors = props.tileColors;
    let colorIndex = 0;
    let barsPerColor = 50;
    let barsDrawn = 0;

    ctx.globalCompositeOperation = "difference";
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 2;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(i * 3.2);

      ctx.strokeStyle = tileColors[colorIndex];
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, barHeight);
      ctx.stroke();

      barsDrawn++;
      if (barsDrawn === barsPerColor) {
        colorIndex = (colorIndex + 1) % tileColors.length;
        barsDrawn = 0;
      }

      if (i > bufferLength * 0.6) {
        ctx.beginPath();
        ctx.arc(0, 0, barHeight / 1.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  const particles = [];

  function drawSmoke(
    bufferLength,
    barWidth,
    barHeight,
    dataArray,
    ctx,
    canvas
  ) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const tileColors = props.tileColors;

    // Create new particles based on the frequency data
    for (let i = 0; i < bufferLength; i++) {
      const angle = (i / bufferLength) * Math.PI * 2;
      const amplitude = dataArray[i] / 255; // Normalize amplitude to range [0, 1]
      const speed = amplitude * 4 + 0.5; // Adjust the speed multiplier as needed
      const size = Math.random() * 5 + 2;
      const opacity = 0.4;

      const particle = {
        x: centerX,
        y: centerY,
        angle: angle,
        speed: speed,
        size: size,
        opacity: opacity,
        color: tileColors[i % tileColors.length],
      };

      particles.push(particle);
    }

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      particle.x += Math.cos(particle.angle) * particle.speed;
      particle.y += Math.sin(particle.angle) * particle.speed;
      particle.opacity -= 0.012;

      if (particle.opacity <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.fillStyle = `rgba(${hexToRgb(particle.color)},${particle.opacity})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
  }

  return (
    <div id="container">
      <canvas id="canvas1" ref={canvasRef}></canvas>
      <audio
        id="audio1"
        src={props.song.src}
        ref={audio}
        onPlay={handlePlay}
      ></audio>
    </div>
  );
}
