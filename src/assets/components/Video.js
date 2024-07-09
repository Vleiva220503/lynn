import React, { useRef, useEffect } from "react";

const Video = ({ track }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (track) {
      track.play(videoRef.current);
    }

    return () => {
      if (track) {
        track.stop();
      }
    };
  }, [track]);

  return <div ref={videoRef} className="w-full h-full bg-black"></div>;
};

export default Video;
