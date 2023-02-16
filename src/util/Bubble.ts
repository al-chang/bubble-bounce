import { angleDeg, Point, randomNumber } from "./utils";

export const BUBBLE_RADIUS = 20;

class Bubble {
  private allowDirectionChange: boolean = true;

  constructor(
    private x: number,
    private y: number,
    private speedX: number,
    private speedY: number,
    private ctx: CanvasRenderingContext2D
  ) {}

  draw(mousePos: Point) {
    const deg = angleDeg(mousePos, { x: this.x, y: this.y });
    console.log(mousePos);

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, BUBBLE_RADIUS, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(0, 0, 0)";
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = "red";
    this.ctx.shadowOffsetY = 10;
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
  }

  randomizeDirection = () => {
    if (!this.allowDirectionChange) return;

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

    // this.allowDirectionChange = false;
    // setTimeout(() => (this.allowDirectionChange = true), 50);
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
}

export default Bubble;
