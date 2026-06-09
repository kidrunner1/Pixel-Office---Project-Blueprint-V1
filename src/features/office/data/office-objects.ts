import {
  MAIN_OFFICE_HEIGHT,
  MAIN_OFFICE_WIDTH,
} from "../maps/main-office-map.ts";

export type CollisionBox = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export type OfficeObject = {
  assetId: string;
  collision: boolean;
  collisionBox?: CollisionBox;
  height: number;
  id: string;
  name: string;
  width: number;
  x: number;
  y: number;
  zIndex?: number;
};

export type OfficeObjectPosition = {
  x: number;
  y: number;
};

export const OFFICE_TILE_SIZE = 72;
export const OFFICE_MAP_PIXEL_WIDTH = MAIN_OFFICE_WIDTH * OFFICE_TILE_SIZE;
export const OFFICE_MAP_PIXEL_HEIGHT = MAIN_OFFICE_HEIGHT * OFFICE_TILE_SIZE;

const PLAYER_COLLISION_OFFSET_X = 22;
const PLAYER_COLLISION_OFFSET_Y = 28;
const PLAYER_COLLISION_WIDTH = 28;
const PLAYER_COLLISION_HEIGHT = 36;

export const OFFICE_OBJECTS = [
  {
    id: "entry-door",
    assetId: "door",
    name: "Office door",
    x: 1042,
    y: 8,
    width: 94,
    height: 150,
    collision: true,
    collisionBox: { x: 1052, y: 102, width: 74, height: 54 },
    zIndex: -40,
  },
  {
    id: "wall-clock",
    assetId: "wall-clock",
    name: "Wall clock",
    x: 600,
    y: 18,
    width: 72,
    height: 74,
    collision: false,
    zIndex: -80,
  },
  {
    id: "meeting-whiteboard",
    assetId: "whiteboard",
    name: "Team whiteboard",
    x: 708,
    y: 14,
    width: 178,
    height: 132,
    collision: false,
    zIndex: -70,
  },
  {
    id: "work-desk-west",
    assetId: "desk",
    name: "Work desk",
    x: 156,
    y: 86,
    width: 238,
    height: 138,
    collision: true,
    collisionBox: { x: 174, y: 180, width: 210, height: 54 },
  },
  {
    id: "work-chair-west",
    assetId: "chair",
    name: "Desk chair",
    x: 286,
    y: 214,
    width: 76,
    height: 114,
    collision: true,
    collisionBox: { x: 300, y: 286, width: 50, height: 36 },
  },
  {
    id: "work-desk-center",
    assetId: "desk",
    name: "Team desk",
    x: 392,
    y: 126,
    width: 238,
    height: 138,
    collision: true,
    collisionBox: { x: 410, y: 220, width: 214, height: 54 },
  },
  {
    id: "work-chair-center",
    assetId: "chair",
    name: "Desk chair",
    x: 506,
    y: 258,
    width: 76,
    height: 114,
    collision: true,
    collisionBox: { x: 520, y: 330, width: 50, height: 36 },
  },
  {
    id: "admin-printer",
    assetId: "printer",
    name: "Printer",
    x: 780,
    y: 116,
    width: 164,
    height: 120,
    collision: true,
    collisionBox: { x: 796, y: 194, width: 136, height: 48 },
  },
  {
    id: "admin-water-dispenser",
    assetId: "water-dispenser",
    name: "Water dispenser",
    x: 1026,
    y: 78,
    width: 64,
    height: 194,
    collision: true,
    collisionBox: { x: 1038, y: 224, width: 42, height: 46 },
  },
  {
    id: "storage-filing-cabinet",
    assetId: "filing-cabinet",
    name: "Filing cabinet",
    x: 960,
    y: 176,
    width: 88,
    height: 126,
    collision: true,
    collisionBox: { x: 972, y: 264, width: 64, height: 36 },
  },
  {
    id: "storage-shelf",
    assetId: "shelf",
    name: "Office shelf",
    x: 970,
    y: 300,
    width: 116,
    height: 112,
    collision: true,
    collisionBox: { x: 984, y: 378, width: 88, height: 32 },
  },
  {
    id: "decor-plant-north",
    assetId: "plant",
    name: "Potted plant",
    x: 82,
    y: 94,
    width: 82,
    height: 116,
    collision: true,
    collisionBox: { x: 102, y: 182, width: 42, height: 28 },
  },
  {
    id: "meeting-table-main",
    assetId: "meeting-table",
    name: "Meeting table",
    x: 278,
    y: 390,
    width: 348,
    height: 138,
    collision: true,
    collisionBox: { x: 318, y: 490, width: 286, height: 44 },
  },
  {
    id: "meeting-chair-west",
    assetId: "chair",
    name: "Meeting chair",
    x: 270,
    y: 492,
    width: 72,
    height: 108,
    collision: true,
    collisionBox: { x: 282, y: 558, width: 48, height: 34 },
  },
  {
    id: "meeting-chair-east",
    assetId: "chair",
    name: "Meeting chair",
    x: 566,
    y: 500,
    width: 72,
    height: 108,
    collision: true,
    collisionBox: { x: 578, y: 566, width: 48, height: 34 },
  },
  {
    id: "coffee-sofa",
    assetId: "sofa",
    name: "Sofa",
    x: 770,
    y: 510,
    width: 152,
    height: 116,
    collision: true,
    collisionBox: { x: 782, y: 586, width: 136, height: 34 },
  },
  {
    id: "coffee-table",
    assetId: "coffee",
    name: "Coffee table",
    x: 706,
    y: 526,
    width: 74,
    height: 72,
    collision: true,
    collisionBox: { x: 718, y: 558, width: 50, height: 30 },
  },
  {
    id: "lounge-coffee-machine",
    assetId: "coffee-machine",
    name: "Coffee machine",
    x: 944,
    y: 430,
    width: 108,
    height: 124,
    collision: true,
    collisionBox: { x: 958, y: 518, width: 82, height: 36 },
  },
  {
    id: "lounge-lamp",
    assetId: "lamp",
    name: "Lamp",
    x: 1042,
    y: 458,
    width: 56,
    height: 92,
    collision: true,
    collisionBox: { x: 1054, y: 526, width: 32, height: 24 },
  },
  {
    id: "decor-plant-south",
    assetId: "plant",
    name: "Potted plant",
    x: 952,
    y: 540,
    width: 82,
    height: 120,
    collision: true,
    collisionBox: { x: 972, y: 628, width: 42, height: 30 },
  },
] as const satisfies readonly OfficeObject[];

export function getOfficeObjectZIndex(object: OfficeObject): number {
  const collisionBox = object.collisionBox;
  const floorY = collisionBox
    ? collisionBox.y + collisionBox.height
    : object.y + object.height;

  return 100 + floorY + (object.zIndex ?? 0);
}

export function getPlayerZIndex(position: OfficeObjectPosition): number {
  const floorY = position.y * OFFICE_TILE_SIZE + 64;

  return 100 + floorY;
}

export function getPlayerCollisionBox(
  position: OfficeObjectPosition,
): CollisionBox {
  return {
    height: PLAYER_COLLISION_HEIGHT,
    width: PLAYER_COLLISION_WIDTH,
    x: position.x * OFFICE_TILE_SIZE + PLAYER_COLLISION_OFFSET_X,
    y: position.y * OFFICE_TILE_SIZE + PLAYER_COLLISION_OFFSET_Y,
  };
}

export function getOfficeObjectCollisionBox(
  object: OfficeObject,
): CollisionBox {
  return (
    object.collisionBox ?? {
      height: object.height,
      width: object.width,
      x: object.x,
      y: object.y,
    }
  );
}

export function doCollisionBoxesOverlap(
  first: CollisionBox,
  second: CollisionBox,
): boolean {
  return (
    first.x < second.x + second.width &&
    first.x + first.width > second.x &&
    first.y < second.y + second.height &&
    first.y + first.height > second.y
  );
}

export function getBlockingOfficeObject(
  position: OfficeObjectPosition,
): OfficeObject | null {
  const playerCollisionBox = getPlayerCollisionBox(position);

  return (
    OFFICE_OBJECTS.find(
      (object) =>
        object.collision &&
        doCollisionBoxesOverlap(
          playerCollisionBox,
          getOfficeObjectCollisionBox(object),
        ),
    ) ?? null
  );
}
