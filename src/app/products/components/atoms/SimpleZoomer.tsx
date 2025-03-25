"use client";
import React, { useRef } from "react";
import Image from "next/image";

export interface SimpleZoomerProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function SimpleZoomer({
  src,
  alt,
  width,
  height,
}: SimpleZoomerProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  return (
    <div id="container">
      <Image
        id="image"
        ref={imgRef}
        src={src}
        width={width}
        height={height}
        alt={alt}
        style={{ transition: "transform 0.4s" }}
      />
      <style jsx>{`
        #container {
          display: inline-block;
          overflow: hidden;
        }
        #container img {
          display: block;
          transition: transform 0.4s;
        }
        #container:hover img {
          transform: scale(1.3);
          transform-origin: 50% 50%;
        }
      `}</style>
    </div>
  );
}
