export default function toRadians(degrees: number[]): number[] {
  const result: number[] = [];
  for (const degree of degrees) {
    result.push((degree / 360) * (Math.PI * 2));
  }
  return result;
}
