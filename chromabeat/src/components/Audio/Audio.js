import { useRef, useEffect, useState } from "react";

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

  return <audio ref={audio} src={props.song.src} />;
}
