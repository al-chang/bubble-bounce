import React, { useEffect, useRef, useState } from "react";
import Bubble, { BUBBLE_RADIUS } from "../../util/Bubble";
import { Point, randomNumber } from "../../util/utils";
import "./index.css";

export type CanvasProps = {
  draw: (context: CanvasRenderingContext2D) => void;
};

const Canvas: React.FC<CanvasProps> = ({ draw }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the canvas
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    let animationFrameId: number;

    const render = () => {
      draw(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <canvas id="canvas" ref={canvasRef}>
      Your browser does not support the HTML 5 canvas tag.
    </canvas>
  );
};

export default Canvas;
