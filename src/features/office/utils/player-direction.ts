export type FacingDirection = "down" | "up" | "left" | "right";

export function getFacingDirectionFromKey(
  key?: string,
): FacingDirection | null {
  if (typeof key !== "string") {
    return null;
  }

  switch (key.toLowerCase()) {
    case "w":
    case "arrowup":
      return "up";
    case "s":
    case "arrowdown":
      return "down";
    case "a":
    case "arrowleft":
      return "left";
    case "d":
    case "arrowright":
      return "right";
    default:
      return null;
  }
}
