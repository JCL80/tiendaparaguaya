'use client';

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { imageZoomReact } from "../utils/imageZoomReact";

export type ImageZoomConfig = {
  /** The minimum viewport width for enabling the zoom effect (default: 1024px) */
  screenThreshold?: number;
  /** CSS properties to override the default lens styles */
  lensStyles?: React.CSSProperties;
  /** CSS properties to override the default zoom result styles */
  resultStyles?: React.CSSProperties;
};

export type ImageZoomProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional configuration to dynamically override default styles/threshold */
  config?: ImageZoomConfig;
};

export default function ImageZoom({
  src,
  alt,
  width,
  height,
  config,
}: ImageZoomProps) {
  // Default configuration values, matching your current CSS
  const defaultScreenThreshold = 1024;
  const defaultLensStyles: React.CSSProperties = {
    position: "absolute",
    border: "1px solid #d4d4d4",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    width: "200px",
    height: "200px",
  };
  const defaultResultStyles: React.CSSProperties = {
    border: "1px solid #d4d4d4",
    width: "600px",
    height: "600px",
    position: "fixed",
    top: "calc(50% + 50px)", // vertically centered with a 50px downward offset
    right: "30px", // distance from the right edge
    transform: "translateY(-50%)",
    zIndex: 3,
    backgroundColor: "white",
  };

  // Merge defaults with any user-provided configuration
  const screenThreshold = config?.screenThreshold ?? defaultScreenThreshold;
  const lensDynamicStyles = { ...defaultLensStyles, ...config?.lensStyles };
  const resultDynamicStyles = { ...defaultResultStyles, ...config?.resultStyles };

  const imgRef = useRef<HTMLImageElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);

  const [showZoomImage, setShowZoomImage] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true);

  // Listen to window resize events to update the screen size state.
  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth >= screenThreshold;
      setIsLargeScreen(large);
      if (!large) {
        setShowZoomImage(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenThreshold]);
  

  function handleMouseEnter() {
    if (isLargeScreen) {
      setShowZoomImage(true);
    }
  }

  function handleMouseLeave() {
    if (isLargeScreen) {
      setShowZoomImage(false);
    }
  }

  // Activate the zoom effect when the screen is large and the mouse is over the image.
  useEffect(() => {
    if (showZoomImage && isLargeScreen) {
      imageZoomReact(imgRef, lensRef, resultRef);
    }
  }, [showZoomImage, isLargeScreen]);

  return (
    <>
      <div
        className="img-zoom-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }} // Needed for proper positioning of the lens
      >
        <div
          ref={lensRef}
          className={`img-zoom-lens ${showZoomImage && isLargeScreen ? "" : "hidden"}`}
          style={{
            ...lensDynamicStyles,
            display: showZoomImage && isLargeScreen ? "block" : "none",
          }}
        ></div>
        <Image
          // Note: Next.js Image might not forward refs, so consider a wrapper if needed.
          ref={imgRef}
          src={src}
          width={width}
          height={height}
          alt={alt}
        />
      </div>
      {isLargeScreen && (
        <div
          ref={resultRef}
          id="myresult"
          className={`img-zoom-result ${showZoomImage ? "" : "hidden"}`}
          style={{
            ...resultDynamicStyles,
            display: showZoomImage ? "block" : "none",
          }}
        ></div>
      )}
    </>
  );
}
