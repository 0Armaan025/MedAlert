import React, { useRef, useEffect } from "react";

const CameraFeed = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = {
      video: true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing the camera:", err);
      });

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    };
  }, []);

  return (
    <div className="camera-feed">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          maxHeight: "100%",
        }}
      />
    </div>
  );
};

export default CameraFeed;
