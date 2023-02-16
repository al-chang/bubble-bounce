import React, { useEffect, useRef, useState } from "react";
import Bubble, { BUBBLE_RADIUS } from "../../util/Bubble";
import { Point, randomNumber } from "../../util/utils";
import "./index.css";

const Canvas: React.FC = () => {
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 });
  // State and canvas ref
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Util functions
  const draw = (ctx: CanvasRenderingContext2D, mousePos: Point) => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    bubbles.forEach((bubble, index) => {
      // bubble.intersectBubbles(bubbles.slice(index + 1));
      bubble.intersectWall();
      bubble.move();
      bubble.draw(mousePos);
    });
  };
  const addBubble = (_bubble: Bubble) => {
    setBubbles((_bubbles) =>
      _bubbles.length >= 25
        ? [..._bubbles.splice(0, 1), _bubble]
        : [..._bubbles, _bubble]
    );
  };
  const handleMouseMove = (e: MouseEvent) => {
    setMousePos({ x: e.screenX, y: e.screenY });
  };
  const handleClickFactory =
    (context: CanvasRenderingContext2D) => (e: MouseEvent) => {
      addBubble(
        new Bubble(
          e.pageX,
          e.pageY,
          randomNumber(-1, 1),
          randomNumber(-4, 4),
          context
        )
      );
    };

  // Initialize bubbles on page load
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const handleClick = handleClickFactory(context);

    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);

    const initBubbles = [];
    for (let i = 0; i < 1; i++) {
      initBubbles.push(
        new Bubble(
          randomNumber(0 + BUBBLE_RADIUS, window.innerWidth - BUBBLE_RADIUS),
          randomNumber(0 + BUBBLE_RADIUS, window.innerHeight - BUBBLE_RADIUS),
          randomNumber(-1, 4),
          randomNumber(-4, 4),
          context
        )
      );
    }
    setBubbles(initBubbles);
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Draw the canvas
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    let animationFrameId: number;

    const render = () => {
      draw(context, mousePos);
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
