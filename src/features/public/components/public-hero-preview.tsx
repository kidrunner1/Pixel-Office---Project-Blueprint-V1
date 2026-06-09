"use client";

import type { ReactNode } from "react";

import { AvatarPreview } from "@/features/avatar/components/avatar-preview";
import { useTranslation } from "@/features/i18n/use-translation";
import { OfficeAsset } from "@/features/office/components/office-asset";
import type { AvatarConfig } from "@/types/avatar";

type PublicHeroPreviewProps = {
  className?: string;
  variant?: "auth" | "hero" | "product";
};

type SceneObjectProps = {
  assetId: string;
  className: string;
};

type ScenePersonProps = {
  avatar: AvatarConfig;
  bubble?: ReactNode;
  className: string;
  direction?: "down" | "left" | "right" | "up";
  name: string;
};

const avatars = {
  alex: {
    hair: "short",
    hairColor: "black",
    face: "smile",
    skinColor: "medium",
    shirt: "hoodie",
    shirtColor: "green",
    pants: "jeans",
    accessory: "glasses",
  },
  maya: {
    hair: "bob",
    hairColor: "brown",
    face: "default",
    skinColor: "dark",
    shirt: "jacket",
    shirtColor: "red",
    pants: "basic",
    accessory: null,
  },
  sam: {
    hair: "spiky",
    hairColor: "blonde",
    face: "cool",
    skinColor: "light",
    shirt: "basic",
    shirtColor: "blue",
    pants: "shorts",
    accessory: null,
  },
} as const satisfies Record<string, AvatarConfig>;

function SceneObject({ assetId, className }: SceneObjectProps) {
  return (
    <div className={`absolute public-office-object ${className}`}>
      <OfficeAsset assetId={assetId} className="h-full w-full" />
    </div>
  );
}

function ScenePerson({
  avatar,
  bubble,
  className,
  direction = "down",
  name,
}: ScenePersonProps) {
  return (
    <div
      className={`absolute flex w-24 flex-col items-center public-scene-person ${className}`}
    >
      {bubble ? (
        <div className="mb-1 max-w-32 border-2 border-slate-950 bg-white px-2 py-1 text-center text-[10px] font-bold leading-tight text-slate-950 shadow-[3px_3px_0_#0f172a]">
          {bubble}
        </div>
      ) : null}
      <div className="relative">
        <div className="absolute bottom-0 left-1/2 h-3 w-12 -translate-x-1/2 bg-slate-950/35 blur-[1px]" />
        <AvatarPreview
          avatar={avatar}
          direction={direction}
          showCaption={false}
          size="small"
        />
      </div>
      <span className="mt-1 border border-slate-600 bg-slate-950/90 px-2 py-0.5 text-[9px] font-bold text-white shadow-[2px_2px_0_rgba(0,0,0,0.4)]">
        {name}
      </span>
    </div>
  );
}

export function PublicHeroPreview({
  className,
  variant = "hero",
}: PublicHeroPreviewProps) {
  const { t } = useTranslation();

  return (
    <div
      aria-hidden="true"
      className={[
        "public-office-scene absolute inset-0 overflow-hidden bg-[#162536]",
        className ?? "",
      ].join(" ")}
    >
      <div className="absolute inset-x-0 top-0 h-[18%] border-b-4 border-[#6f4b3d] bg-[#1b2c40] shadow-[inset_0_-10px_0_rgba(3,7,18,0.25)]">
        <div className="absolute left-[8%] top-[18%] h-2 w-[20%] bg-[#31455a]" />
        <div className="absolute right-[12%] top-[24%] h-2 w-[14%] bg-[#31455a]" />
      </div>
      <div className="public-office-floor absolute inset-x-0 bottom-0 top-[18%]" />
      <div className="absolute inset-0 bg-[#020617]/20" />

      <div className="absolute left-[9%] top-[6%] h-[12%] w-[20%] border-2 border-[#8c664f] bg-[#dce8dd] shadow-[4px_5px_0_rgba(2,6,23,0.4)]">
        <span className="absolute left-[12%] top-[25%] h-1 w-[45%] bg-[#eb7a62]" />
        <span className="absolute left-[12%] top-[45%] h-1 w-[68%] bg-[#2f8f83]" />
        <span className="absolute left-[12%] top-[65%] h-1 w-[34%] bg-[#d1a43b]" />
      </div>

      <SceneObject
        assetId="wall-clock"
        className="right-[10%] top-[4%] w-[6%]"
      />
      <SceneObject
        assetId="shelf"
        className="left-[3%] top-[20%] w-[10%]"
      />
      <SceneObject
        assetId="plant"
        className="left-[2%] bottom-[8%] w-[7%]"
      />
      <SceneObject
        assetId="plant"
        className="right-[3%] top-[24%] w-[6%]"
      />

      <SceneObject
        assetId="desk"
        className="left-[16%] top-[29%] w-[22%]"
      />
      <SceneObject
        assetId="chair"
        className="left-[23%] top-[48%] w-[7%]"
      />
      <SceneObject
        assetId="desk"
        className="left-[38%] top-[25%] w-[21%]"
      />
      <SceneObject
        assetId="chair"
        className="left-[45%] top-[43%] w-[7%]"
      />

      <div className="absolute bottom-[11%] right-[7%] h-[28%] w-[31%] border-2 border-[#7b4451] bg-[#8f5360]/55 shadow-[inset_0_0_0_4px_rgba(255,255,255,0.08)]" />
      <SceneObject
        assetId="sofa"
        className="bottom-[14%] right-[7%] w-[17%]"
      />
      <SceneObject
        assetId="coffee"
        className="bottom-[16%] right-[25%] w-[7%]"
      />
      <SceneObject
        assetId="lamp"
        className="bottom-[24%] right-[3%] w-[4%]"
      />

      <SceneObject
        assetId="meeting-table"
        className="bottom-[12%] left-[11%] w-[27%]"
      />
      <SceneObject
        assetId="printer"
        className="right-[15%] top-[21%] w-[12%]"
      />

      <div className="absolute right-[4%] top-[8%] flex items-center gap-2 border-2 border-[#31455a] bg-[#07111f]/90 px-3 py-2 text-[10px] font-bold text-slate-200 shadow-[3px_3px_0_rgba(0,0,0,0.35)]">
        <span className="h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        {t("public.teammatesOnline", { count: 3 })}
      </div>

      <ScenePerson
        avatar={avatars.alex}
        bubble={t("public.shipIt")}
        className="left-[25%] top-[38%]"
        name="Alex"
      />
      <ScenePerson
        avatar={avatars.maya}
        bubble={t("public.reviewingNow")}
        className="left-[48%] top-[34%]"
        direction="left"
        name="Maya"
      />
      <ScenePerson
        avatar={avatars.sam}
        bubble={variant === "auth" ? undefined : t("public.coffeeBreak")}
        className="bottom-[8%] right-[17%]"
        direction="right"
        name="Sam"
      />

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#07111f]/35" />
    </div>
  );
}
