"use client";

import type { CSSProperties } from "react";

import { useTranslation } from "@/features/i18n/use-translation";
import { OfficeAsset } from "@/features/office/components/office-asset";
import { OfficePlayer } from "@/features/office/components/office-player";
import { OfficeTile } from "@/features/office/components/office-tile";
import {
  OFFICE_MAP_PIXEL_HEIGHT,
  OFFICE_MAP_PIXEL_WIDTH,
  OFFICE_OBJECTS,
  OFFICE_TILE_SIZE,
  getOfficeObjectZIndex,
  type OfficeObject,
} from "@/features/office/data/office-objects";
import {
  MAIN_OFFICE_HEIGHT,
  MAIN_OFFICE_TILES,
  MAIN_OFFICE_WIDTH,
} from "@/features/office/maps/main-office-map";
import type { FacingDirection } from "@/features/office/utils/player-direction";
import type { RoomView } from "@/types/room";

type OfficeMapProps = {
  currentUserDirection: FacingDirection;
  currentUserId: string;
  currentUserIsMoving: boolean;
  room: RoomView;
};

function getStageStyle(): CSSProperties {
  return {
    height: OFFICE_MAP_PIXEL_HEIGHT,
    width: OFFICE_MAP_PIXEL_WIDTH,
  };
}

function getTileGridStyle(): CSSProperties {
  return {
    gridTemplateColumns: `repeat(${MAIN_OFFICE_WIDTH}, ${OFFICE_TILE_SIZE}px)`,
    gridTemplateRows: `repeat(${MAIN_OFFICE_HEIGHT}, ${OFFICE_TILE_SIZE}px)`,
  };
}

function getObjectStyle(object: OfficeObject): CSSProperties {
  return {
    height: object.height,
    left: object.x,
    top: object.y,
    width: object.width,
    zIndex: getOfficeObjectZIndex(object),
  };
}

function OfficeObjectSprite({ object }: { object: OfficeObject }) {
  const castsFloorShadow =
    object.collision && object.assetId !== "door";
  const objectImageClass =
    object.assetId === "lamp"
      ? "h-full w-full object-contain pixel-art-image drop-shadow-[0_5px_3px_rgba(2,6,23,0.48)] drop-shadow-[0_0_12px_rgba(251,191,36,0.28)]"
      : "h-full w-full object-contain pixel-art-image drop-shadow-[0_5px_3px_rgba(2,6,23,0.48)]";

  return (
    <div
      aria-label={object.name}
      className="pointer-events-none absolute"
      style={getObjectStyle(object)}
      title={object.name}
    >
      {castsFloorShadow ? (
        <span
          aria-hidden="true"
          className="absolute bottom-[3%] left-[14%] h-[8%] w-[72%] rounded-[50%] bg-slate-950/[0.32] blur-[2px]"
        />
      ) : null}
      <OfficeAsset
        assetId={object.assetId}
        className={objectImageClass}
      />
    </div>
  );
}

export function OfficeMap({
  currentUserDirection,
  currentUserId,
  currentUserIsMoving,
  room,
}: OfficeMapProps) {
  const { t } = useTranslation();
  const activeMembers = room.roomMembers
    .filter((member) => member.isOnline)
    .slice(0, room.maxMembers);

  return (
    <section className="border border-cyan-950 bg-[#071426] p-2 shadow-[4px_4px_0_#020617]">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
        <p className="font-medium text-cyan-200">
          {t("office.seatsOccupied", {
            active: activeMembers.length,
            max: room.maxMembers,
          })}
        </p>
        <p className="text-slate-500">
          {t("office.studioSize", {
            width: MAIN_OFFICE_WIDTH,
            height: MAIN_OFFICE_HEIGHT,
          })}
        </p>
      </div>

      <div className="overflow-x-auto border-4 border-slate-950 bg-[#06142a] p-2 shadow-[inset_0_0_0_4px_#182a3d,0_8px_22px_rgba(2,6,23,0.36)]">
        <div
          className="relative overflow-hidden bg-[#183d54] shadow-[inset_0_26px_34px_rgba(3,10,20,0.46),inset_0_-20px_34px_rgba(2,6,23,0.32),inset_18px_0_28px_rgba(2,6,23,0.18),inset_-18px_0_28px_rgba(2,6,23,0.18)]"
          style={getStageStyle()}
        >
          <div
            className="absolute inset-0 grid"
            style={getTileGridStyle()}
          >
            {MAIN_OFFICE_TILES.flatMap((row, positionY) =>
              row.map((tile, positionX) => (
                <OfficeTile
                  key={`${positionX}:${positionY}`}
                  tile={tile}
                  x={positionX}
                  y={positionY}
                />
              )),
            )}
          </div>

          <div className="pointer-events-none absolute inset-[72px] z-[2] bg-amber-200/[0.018] shadow-[inset_0_0_70px_rgba(251,191,36,0.04)]" />

          <div className="absolute inset-0">
            {OFFICE_OBJECTS.map((object) => (
              <OfficeObjectSprite key={object.id} object={object} />
            ))}
          </div>

          <div className="absolute inset-0">
            {activeMembers.map((member) => (
              <OfficePlayer
                direction={
                  member.userId === currentUserId
                    ? currentUserDirection
                    : "down"
                }
                isCurrentUser={member.userId === currentUserId}
                isWalking={
                  member.userId === currentUserId &&
                  currentUserIsMoving
                }
                key={member.id}
                member={member}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 z-[2500] border-[10px] border-[#070e19] shadow-[inset_0_0_0_3px_#31485b,inset_0_20px_22px_rgba(2,6,23,0.42),inset_0_-7px_0_rgba(126,84,50,0.16)]" />
        </div>
      </div>
    </section>
  );
}
