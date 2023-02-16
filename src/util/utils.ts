export enum QUADRENT {
  ONE = "ONE",
  TWO = "TWO",
  THREE = "THREE",
  FOUR = "FOUR",
}

export type Point = {
  x: number;
  y: number;
};

export const randomNumber = (minValue: number, maxValue: number) =>
  Math.random() * (maxValue - minValue) + minValue;

export const lerp = (a: number, b: number, n: number) => (b - a) * n + a;

export const angleDeg = (p1: Point, p2: Point) =>
  (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;

export const angleRad = (p1: Point, p2: Point) =>
  Math.atan2(p2.y - p1.y, p2.x - p1.x);

export const findQuadrent = (origin: Point, dest: Point) => {
  const xVal = dest.x - origin.x;
  const yVal = (dest.y - origin.y) * -1;
  if (xVal >= 0 && yVal >= 0) {
    return QUADRENT.ONE;
  } else if (xVal <= 0 && yVal >= 0) {
    return QUADRENT.TWO;
  } else if (xVal <= 0 && yVal <= 0) {
    return QUADRENT.THREE;
  } else {
    return QUADRENT.FOUR;
  }
};

// TODO: Complete logic for this function
export const pointInCircle = (
  point: Point,
  circleOrigin: Point,
  radius: number
) => {
  return false;
};
