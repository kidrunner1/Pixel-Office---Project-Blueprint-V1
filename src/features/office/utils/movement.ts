import {
  isMainOfficeTileBlocked,
  MAIN_OFFICE_HEIGHT,
  MAIN_OFFICE_WIDTH,
} from "../maps/main-office-map.ts";
import { getBlockingOfficeObject } from "../data/office-objects.ts";

export const OFFICE_MAP_WIDTH = MAIN_OFFICE_WIDTH;
export const OFFICE_MAP_HEIGHT = MAIN_OFFICE_HEIGHT;

export type Direction = "up" | "down" | "left" | "right";

export type Position = {
  x: number;
  y: number;
};

export function clampPosition(x: number, y: number): Position {
  return {
    x: Math.min(Math.max(x, 0), OFFICE_MAP_WIDTH - 1),
    y: Math.min(Math.max(y, 0), OFFICE_MAP_HEIGHT - 1),
  };
}

export function getNextPosition(
  currentPosition: Position,
  direction: Direction,
): Position {
  switch (direction) {
    case "up":
      return clampPosition(currentPosition.x, currentPosition.y - 1);
    case "down":
      return clampPosition(currentPosition.x, currentPosition.y + 1);
    case "left":
      return clampPosition(currentPosition.x - 1, currentPosition.y);
    case "right":
      return clampPosition(currentPosition.x + 1, currentPosition.y);
  }
}

export function isBlockedOfficePosition(position: Position): boolean {
  return (
    isMainOfficeTileBlocked(position) ||
    Boolean(getBlockingOfficeObject(position))
  );
}
