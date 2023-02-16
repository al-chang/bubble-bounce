import { angleRad, Point, randomNumber } from "./utils";

export const BUBBLE_RADIUS = 40;

class Bubble {
  constructor(
    private x: number,
    private y: number,
    private speedX: number,
    private speedY: number
  ) {}

  draw(ctx: CanvasRenderingContext2D, mousePos: Point) {
    const ang = angleRad({ x: this.x, y: this.y }, mousePos);
    const { offsetX, offsetY } = this.calcOffset(ang);
    const shadowOffset = 0.25;
    const pupilOffset = 0.2;

    this.drawEye(ctx, offsetX * shadowOffset, offsetY * shadowOffset);
    this.drawIris(ctx, offsetX * pupilOffset, offsetY * pupilOffset);
    this.drawPupil(ctx, offsetX * pupilOffset, offsetY * pupilOffset);
  }

  move() {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
  }

  randomizeDirection = () => {
    if (this.speedX > 0) {
      this.speedX = randomNumber(-2, -1);
    } else {
      this.speedX = randomNumber(1, 2);
    }
    if (this.speedY > 0) {
      this.speedY = randomNumber(-4, -1);
    } else {
      this.speedY = randomNumber(1, 4);
    }
  };

  intersectBubble(bubble: Bubble) {
    const d = Math.sqrt(
      Math.pow(this.x - bubble.x, 2) + Math.pow(this.y - bubble.y, 2)
    );

    if (d < BUBBLE_RADIUS + BUBBLE_RADIUS) {
      return true;
    }
    return false;
  }

  /**
   * Check if bubble intersects with given list of bubbles
   * @param {Bubble[]} bubbles bubbles to check against
   */
  intersectBubbles(bubbles: Bubble[]) {
    bubbles.forEach((bubble) => {
      if (this.intersectBubble(bubble)) {
        this.randomizeDirection();
        bubble.randomizeDirection();
      }
    });
  }

  /**
   * Check if the bubble intersects with the edges of the canvas
   */
  intersectWall() {
    if (
      this.x > window.innerWidth - BUBBLE_RADIUS ||
      this.x < 0 + BUBBLE_RADIUS
    ) {
      this.speedX = this.speedX * -1;
    }
    if (
      this.y > window.innerHeight - BUBBLE_RADIUS ||
      this.y < 0 + BUBBLE_RADIUS
    ) {
      this.speedY = this.speedY * -1;
    }
  }

  private calcOffset(angleRad: number) {
    const offsetX = Math.cos(angleRad) * BUBBLE_RADIUS;
    const offsetY = Math.sin(angleRad) * BUBBLE_RADIUS;
    return { offsetX, offsetY };
  }

  private drawEye(
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number
  ) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, BUBBLE_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgb(0, 0, 0)";
    ctx.shadowOffsetX = offsetX;
    ctx.shadowOffsetY = offsetY;
    ctx.fill();
    ctx.closePath();
  }

  private drawIris(
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number
  ) {
    ctx.beginPath();
    ctx.shadowBlur = 0;
    ctx.shadowColor = "rgba(0, 0, 0, 0)";
    ctx.arc(
      this.x + offsetX,
      this.y + offsetY,
      BUBBLE_RADIUS * 0.66,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "rgb(0, 100, 255)";
    ctx.fill();
    ctx.closePath();
  }

  private drawPupil(
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number
  ) {
    ctx.beginPath();
    ctx.shadowBlur = 0;
    ctx.shadowColor = "rgba(0, 0, 0, 0)";
    ctx.arc(
      this.x + offsetX,
      this.y + offsetY,
      BUBBLE_RADIUS * 0.33,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fill();
    ctx.closePath();
  }
}

export default Bubble;
