export const randomNumber = (minValue: number, maxValue: number) =>
  Math.random() * (maxValue - minValue) + minValue;

export const lerp = (a: number, b: number, n: number) => (b - a) * n + a;

export type Point = {
  x: number;
  y: number;
};

export const angleDeg = (p1: Point, p2: Point) =>
  (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
