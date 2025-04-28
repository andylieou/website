import React, { useState, useEffect } from "react";

type BouncingImageProps = {
    image: string;
};

function BouncingImage({ image }: BouncingImageProps) {
  // create state (i.e. a variable React will keep track of) with a way to update said state
  const [position, setPosition] = useState({ top: 50, left: 50 });

  useEffect(() => {
    const moveImage = () => {
      let newTop = (Math.random() - 0.5) * (window.innerHeight - 80);
      let newLeft = (Math.random() - 0.5) * (window.innerWidth - 80);

      newTop = Math.max(0, newTop);
      newTop = Math.min(window.innerHeight - 80, newTop);
      newLeft = Math.max(0, newLeft);
      newLeft = Math.min(window.innerWidth - 80, newLeft);

      setPosition({ top: newTop, left: newLeft });
    };

    const interval = setInterval(moveImage, 1000); // move every 1 second
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={image}
      alt="Milo bouncing"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: "80px",
        height: "80px",
        transition: "top 2s ease, left 2s ease",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  );
}

export default BouncingImage;
