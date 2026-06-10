"use client";

import { useTranslation } from "@/features/i18n/use-translation";
import { PixelCharacter } from "@/features/avatar/components/pixel-character";
import type { FacingDirection } from "@/features/office/utils/player-direction";
import type { AvatarConfig } from "@/types/avatar";

type AvatarPreviewProps = {
  avatar: AvatarConfig | null;
  direction?: FacingDirection;
  showCaption?: boolean;
  size?: "large" | "mini" | "small";
};

const defaultAvatar: AvatarConfig = {
  hair: "short",
  hairColor: "black",
  face: "default",
  skinColor: "medium",
  shirt: "basic",
  shirtColor: "blue",
  pants: "basic",
  accessory: null,
};

export function AvatarPreview({
  avatar,
  direction = "down",
  showCaption = true,
  size = "large",
}: AvatarPreviewProps) {
  const { t } = useTranslation();
  const avatarConfig = avatar ?? defaultAvatar;
  const directionLabel = t(`avatar.direction.${direction}`);
  const character = (
    <PixelCharacter
      ariaLabel={t("avatar.ariaFacing", { direction: directionLabel })}
      avatar={avatarConfig}
      direction={direction}
    />
  );

  if (size === "mini") {
    return (
      <div className="h-[58px] w-[42px] overflow-hidden">
        <div className="ml-0.5 origin-top-left scale-[0.52]">
          {character}
        </div>
      </div>
    );
  }

  if (size === "small") {
    return (
      <div className="h-[102px] w-[66px] overflow-visible">
        <div className="origin-top-left scale-[0.9]">{character}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-56 w-40 overflow-hidden rounded-md border border-slate-700 bg-slate-950 shadow-inner">
        <span
          aria-hidden="true"
          className="absolute bottom-7 left-1/2 h-3 w-20 -translate-x-1/2 rounded-[50%] bg-black/40 blur-[1px]"
        />
        <div className="absolute left-6 top-5 origin-top-left scale-[1.55]">
          {character}
        </div>
      </div>

      {showCaption ? (
        <p className="text-center text-xs text-slate-400">
          {t("avatar.previewCaption")}
        </p>
      ) : null}
    </div>
  );
}
