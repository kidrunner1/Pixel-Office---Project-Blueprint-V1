export const MAIN_OFFICE_WIDTH = 16;
export const MAIN_OFFICE_HEIGHT = 10;

export type MainOfficeTileType =
  | "floor"
  | "wall"
  | "desk"
  | "chair"
  | "plant"
  | "printer"
  | "shelf"
  | "server"
  | "lamp"
  | "meetingTable"
  | "sofa"
  | "rug"
  | "coffee"
  | "empty";

export type MainOfficeZone =
  | "work"
  | "meeting"
  | "coffee"
  | "server"
  | "decor";

export type MainOfficeTile = {
  label?: string;
  type: MainOfficeTileType;
  zone?: MainOfficeZone;
};

export type MainOfficePosition = {
  x: number;
  y: number;
};

export const BLOCKED_MAIN_OFFICE_TILE_TYPES = [
  "wall",
] as const satisfies readonly MainOfficeTileType[];

const blockedTileTypes = new Set<MainOfficeTileType>(
  BLOCKED_MAIN_OFFICE_TILE_TYPES,
);

function createTile(
  type: MainOfficeTileType,
  zone?: MainOfficeZone,
  label?: string,
): MainOfficeTile {
  return {
    label,
    type,
    zone,
  };
}

const floor = createTile("floor");
const wall = createTile("wall");
const empty = createTile("empty");

const workFloor = createTile("floor", "work");
const meetingFloor = createTile("floor", "meeting");
const coffeeFloor = createTile("floor", "coffee");
const serverFloor = createTile("floor", "server");
const decorFloor = createTile("floor", "decor");

const rug = createTile("rug", "coffee", "Rug");

export const MAIN_OFFICE_TILES = [
  [
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
  ],
  [
    wall,
    decorFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    floor,
    serverFloor,
    serverFloor,
    serverFloor,
    serverFloor,
    decorFloor,
    wall,
  ],
  [
    wall,
    decorFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    floor,
    serverFloor,
    serverFloor,
    serverFloor,
    serverFloor,
    decorFloor,
    wall,
  ],
  [
    wall,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    floor,
    floor,
    serverFloor,
    serverFloor,
    serverFloor,
    serverFloor,
    wall,
  ],
  [
    wall,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    workFloor,
    floor,
    floor,
    floor,
    decorFloor,
    serverFloor,
    serverFloor,
    serverFloor,
    wall,
  ],
  [
    wall,
    floor,
    floor,
    floor,
    floor,
    floor,
    floor,
    floor,
    floor,
    floor,
    floor,
    floor,
    floor,
    floor,
    floor,
    wall,
  ],
  [
    wall,
    floor,
    floor,
    meetingFloor,
    meetingFloor,
    meetingFloor,
    meetingFloor,
    meetingFloor,
    meetingFloor,
    floor,
    floor,
    coffeeFloor,
    coffeeFloor,
    coffeeFloor,
    coffeeFloor,
    wall,
  ],
  [
    wall,
    decorFloor,
    decorFloor,
    meetingFloor,
    meetingFloor,
    meetingFloor,
    meetingFloor,
    meetingFloor,
    meetingFloor,
    floor,
    rug,
    rug,
    rug,
    rug,
    coffeeFloor,
    wall,
  ],
  [
    wall,
    empty,
    meetingFloor,
    meetingFloor,
    meetingFloor,
    meetingFloor,
    meetingFloor,
    meetingFloor,
    meetingFloor,
    floor,
    rug,
    rug,
    rug,
    rug,
    empty,
    wall,
  ],
  [
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
    wall,
  ],
] as const satisfies readonly (readonly MainOfficeTile[])[];

export function isWithinMainOfficeBounds({
  x,
  y,
}: MainOfficePosition): boolean {
  return (
    x >= 0 &&
    x < MAIN_OFFICE_WIDTH &&
    y >= 0 &&
    y < MAIN_OFFICE_HEIGHT
  );
}

export function getMainOfficeTile(
  position: MainOfficePosition,
): MainOfficeTile | null {
  if (!isWithinMainOfficeBounds(position)) {
    return null;
  }

  return MAIN_OFFICE_TILES[position.y][position.x] ?? null;
}

export function isMainOfficeTileBlocked(
  position: MainOfficePosition,
): boolean {
  const tile = getMainOfficeTile(position);

  return tile ? blockedTileTypes.has(tile.type) : true;
}
