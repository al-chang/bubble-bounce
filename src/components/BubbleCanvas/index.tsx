import { useEffect, useRef, useState } from "react";
import Bubble, { BUBBLE_RADIUS } from "../../util/Bubble";
import { Point, randomNumber } from "../../util/utils";
import Canvas from "../Canvas";

const BubbleCanvas: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const mousePos = useRef<Point>({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    mousePos.current = { x: e.screenX, y: e.screenY };
  };

  // Util functions
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    bubbles.forEach((bubble) => {
      bubble.intersectWall();
      bubble.move();
      bubble.draw(ctx, mousePos.current);
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    const initBubbles = [];
    for (let i = 0; i < 1; i++) {
      initBubbles.push(
        new Bubble(
          randomNumber(0 + BUBBLE_RADIUS, window.innerWidth - BUBBLE_RADIUS),
          randomNumber(0 + BUBBLE_RADIUS, window.innerHeight - BUBBLE_RADIUS),
          randomNumber(-1, 4),
          randomNumber(-4, 4)
        )
      );
    }
    setBubbles(initBubbles);
    return () => {
      // window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [setBubbles]);
  return <Canvas draw={draw} />;
};

export default BubbleCanvas;
