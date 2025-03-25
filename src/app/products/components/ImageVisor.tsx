"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ImageZoom  , SimpleZoomer , MouseMoveViewer} from "image-zoom-kit";

type ImageVisorProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

export default function ImageVisor({
  src,
  alt = "Product image",
  width = 1024,
  height = 1024,
}: ImageVisorProps) {

  return (
      <MouseMoveViewer src={src} alt={alt} width={width} height={height} /> 
    // <ImageZoom src={src} alt={alt} width={width} height={height}/>
    // <SimpleZoomer src={src} alt={alt} width={width} height={height}/>
);
}
