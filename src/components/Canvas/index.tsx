import React, { useCallback, useEffect, useRef } from "react";
import "./index.css";

export type CanvasProps = {
  draw: (context: CanvasRenderingContext2D) => void;
};

const Canvas: React.FC<CanvasProps> = ({ draw }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawCallback = useCallback(
    (ctx: CanvasRenderingContext2D) => draw(ctx),
    [draw]
  );

  // Draw the canvas
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    let animationFrameId: number;

    const render = () => {
      drawCallback(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [drawCallback]);

  return (
    <canvas id="canvas" ref={canvasRef}>
      Your browser does not support the HTML 5 canvas tag.
    </canvas>
  );
};

export default Canvas;
