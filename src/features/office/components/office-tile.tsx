import type { ReactNode } from "react";

import { getOfficeAsset } from "@/features/office/assets/office-assets";
import { OfficeAsset } from "@/features/office/components/office-asset";
import type {
  MainOfficeTile,
  MainOfficeTileType,
} from "@/features/office/maps/main-office-map";

type OfficeTileProps = {
  children?: ReactNode;
  isCurrentUser?: boolean;
  isOccupied?: boolean;
  tile: MainOfficeTile;
  x: number;
  y: number;
};

const tileSurfaceClasses: Record<MainOfficeTileType, string> = {
  chair: "bg-[#5a3a4d]",
  coffee: "bg-[#28405a]",
  desk: "bg-[#55331d]",
  empty: "bg-[#081827]",
  floor: "bg-[#183d54]",
  lamp: "bg-[#3b3154]",
  meetingTable: "bg-[#4b3a29]",
  plant: "bg-[#183d54]",
  printer: "bg-[#26324a]",
  rug: "bg-[#275268]",
  server: "bg-[#162033]",
  shelf: "bg-[#3b2a24]",
  sofa: "bg-[#2f425e]",
  wall: "bg-[#0c1728]",
};

const zoneGlowClasses = {
  coffee: "shadow-[inset_0_0_30px_rgba(251,191,36,0.026)]",
  decor: "shadow-[inset_0_0_30px_rgba(74,222,128,0.012)]",
  meeting: "shadow-[inset_0_0_30px_rgba(56,189,248,0.014)]",
  server: "shadow-[inset_0_0_30px_rgba(129,140,248,0.016)]",
  work: "shadow-[inset_0_0_30px_rgba(45,212,191,0.016)]",
} satisfies Record<NonNullable<MainOfficeTile["zone"]>, string>;

function PixelDesk() {
  return (
    <div className="grid place-items-center gap-1">
      <div className="h-5 w-11 border-2 border-amber-950 bg-amber-600 shadow-[0_4px_0_#78350f]" />
      <div className="flex w-10 justify-between">
        <span className="h-2 w-2 bg-cyan-200" />
        <span className="h-2 w-4 bg-slate-950/60" />
      </div>
    </div>
  );
}

function PixelChair() {
  return (
    <div className="grid place-items-center gap-1">
      <div className="h-4 w-6 border-2 border-emerald-950 bg-emerald-500" />
      <div className="h-2 w-8 bg-emerald-900" />
    </div>
  );
}

function PixelShelf() {
  return (
    <div className="grid gap-1">
      <div className="h-2 w-12 bg-amber-800" />
      <div className="flex gap-1">
        <span className="h-5 w-2 bg-rose-400" />
        <span className="h-5 w-2 bg-cyan-300" />
        <span className="h-5 w-2 bg-yellow-300" />
        <span className="h-5 w-2 bg-indigo-300" />
      </div>
      <div className="h-2 w-12 bg-amber-950" />
    </div>
  );
}

function PixelPlant() {
  return (
    <div className="grid place-items-center">
      <div className="grid grid-cols-3 gap-0.5">
        <span className="h-2 w-2 bg-emerald-300" />
        <span className="h-2 w-2 bg-lime-300" />
        <span className="h-2 w-2 bg-emerald-400" />
        <span className="h-2 w-2 bg-lime-400" />
        <span className="h-2 w-2 bg-emerald-500" />
        <span className="h-2 w-2 bg-lime-500" />
      </div>
      <div className="h-4 w-6 border-2 border-amber-950 bg-amber-700" />
    </div>
  );
}

function PixelPrinter() {
  return (
    <div className="grid place-items-center gap-1">
      <div className="h-6 w-11 border-2 border-slate-950 bg-slate-300">
        <div className="mx-auto mt-1 h-2 w-7 bg-slate-700" />
      </div>
      <div className="h-3 w-12 border-2 border-slate-950 bg-slate-500" />
    </div>
  );
}

function PixelLamp() {
  return (
    <div className="grid place-items-center">
      <div className="h-3 w-9 bg-yellow-100 shadow-[0_0_18px_#fde68a]" />
      <div className="h-7 w-2 bg-yellow-800" />
      <div className="h-2 w-8 bg-yellow-950" />
    </div>
  );
}

function PixelServer() {
  return (
    <div className="grid h-12 w-9 gap-1 border-2 border-slate-500 bg-slate-950 p-1 shadow-[0_0_12px_rgba(34,211,238,0.18)]">
      <span className="bg-cyan-300" />
      <span className="bg-emerald-300" />
      <span className="bg-indigo-300" />
      <span className="bg-slate-600" />
    </div>
  );
}

function PixelMeetingTable() {
  return (
    <div className="grid place-items-center">
      <div className="h-8 w-12 border-2 border-orange-950 bg-orange-600 shadow-[0_4px_0_#7c2d12]" />
      <div className="mt-1 flex gap-2">
        <span className="h-2 w-3 bg-cyan-300" />
        <span className="h-2 w-3 bg-cyan-300" />
      </div>
    </div>
  );
}

function PixelSofa() {
  return (
    <div className="grid place-items-center gap-1">
      <div className="h-5 w-12 border-2 border-sky-950 bg-sky-600" />
      <div className="h-3 w-14 bg-sky-800" />
    </div>
  );
}

function PixelCoffee() {
  return (
    <div className="grid place-items-center">
      <div className="h-7 w-7 border-2 border-amber-950 bg-amber-700" />
      <div className="absolute h-2 w-2 bg-cyan-200 shadow-[8px_0_0_#fde68a,-8px_0_0_#fca5a5]" />
    </div>
  );
}

function PixelWall() {
  return (
    <div className="absolute inset-0 bg-[#0a1424] shadow-[inset_0_-8px_0_#172b45,inset_0_-12px_0_#203a59]" />
  );
}

function PixelRug() {
  return (
    <div className="absolute inset-0 bg-[#315a67]/45 after:absolute after:inset-1 after:border after:border-amber-200/[0.035]" />
  );
}

function OfficeAssetOrFallback({
  assetId,
  className,
  fallback,
}: {
  assetId: string;
  className: string;
  fallback: ReactNode;
}) {
  return getOfficeAsset(assetId) ? (
    <OfficeAsset assetId={assetId} className={className} />
  ) : (
    fallback
  );
}

function OfficeTileObject({ tile }: { tile: MainOfficeTile }) {
  switch (tile.type) {
    case "chair":
      return (
        <OfficeAssetOrFallback
          assetId="chair"
          className="h-auto max-h-14 max-w-[84%] drop-shadow-[0_4px_0_rgba(2,6,23,0.6)]"
          fallback={<PixelChair />}
        />
      );
    case "coffee":
      return (
        <OfficeAssetOrFallback
          assetId="coffee"
          className="h-auto max-h-12 max-w-[74%] drop-shadow-[0_4px_0_rgba(2,6,23,0.5)]"
          fallback={<PixelCoffee />}
        />
      );
    case "desk":
      return (
        <OfficeAssetOrFallback
          assetId="desk"
          className="h-auto max-h-14 max-w-[92%] drop-shadow-[0_4px_0_rgba(2,6,23,0.6)]"
          fallback={<PixelDesk />}
        />
      );
    case "lamp":
      return (
        <OfficeAssetOrFallback
          assetId="lamp"
          className="h-auto max-h-14 max-w-[70%] drop-shadow-[0_4px_0_rgba(2,6,23,0.55)]"
          fallback={<PixelLamp />}
        />
      );
    case "meetingTable":
      return (
        <OfficeAssetOrFallback
          assetId="meeting-table"
          className="h-auto max-h-14 max-w-[96%] drop-shadow-[0_4px_0_rgba(2,6,23,0.6)]"
          fallback={<PixelMeetingTable />}
        />
      );
    case "plant":
      return (
        <OfficeAssetOrFallback
          assetId="plant"
          className="h-auto max-h-16 max-w-[78%] drop-shadow-[0_4px_0_rgba(2,6,23,0.5)]"
          fallback={<PixelPlant />}
        />
      );
    case "printer":
      return (
        <OfficeAssetOrFallback
          assetId="printer"
          className="h-auto max-h-14 max-w-[90%] drop-shadow-[0_4px_0_rgba(2,6,23,0.6)]"
          fallback={<PixelPrinter />}
        />
      );
    case "rug":
      return <PixelRug />;
    case "server":
      return <PixelServer />;
    case "shelf":
      return (
        <OfficeAssetOrFallback
          assetId="shelf"
          className="h-auto max-h-16 max-w-[88%] drop-shadow-[0_4px_0_rgba(2,6,23,0.55)]"
          fallback={<PixelShelf />}
        />
      );
    case "sofa":
      return (
        <OfficeAssetOrFallback
          assetId="sofa"
          className="h-auto max-h-14 max-w-[90%] drop-shadow-[0_4px_0_rgba(2,6,23,0.55)]"
          fallback={<PixelSofa />}
        />
      );
    case "wall":
      return <PixelWall />;
    case "empty":
    case "floor":
      return null;
  }
}

export function OfficeTile({
  children,
  isCurrentUser = false,
  isOccupied = false,
  tile,
  x,
  y,
}: OfficeTileProps) {
  const isAltTile = (x + y) % 2 === 0;
  const zoneGlowClass = tile.zone ? zoneGlowClasses[tile.zone] : "";
  const floorTextureClass =
    tile.type === "floor" || tile.type === "empty"
      ? isAltTile
        ? "after:bg-white/[0.004]"
        : "after:bg-black/[0.004]"
      : "";
  const occupancyClass = isCurrentUser
      ? "border-emerald-300 bg-emerald-950/80 shadow-[inset_0_0_0_3px_#34d399,0_0_20px_rgba(52,211,153,0.25)]"
    : isOccupied
      ? "border-sky-300/80 bg-sky-950/60 shadow-[inset_0_0_0_2px_#38bdf8]"
      : "border-transparent";

  return (
    <div
      aria-label={tile.label ?? tile.type}
      className={[
        "relative grid aspect-square min-h-[72px] place-items-center overflow-hidden border text-[10px]",
        "after:pointer-events-none after:absolute after:inset-0",
        tileSurfaceClasses[tile.type],
        zoneGlowClass,
        floorTextureClass,
        occupancyClass,
      ].join(" ")}
      title={tile.label ?? tile.type}
    >
      {!children ? <OfficeTileObject tile={tile} /> : null}

      {children ? <div className="relative z-10">{children}</div> : null}
    </div>
  );
}
