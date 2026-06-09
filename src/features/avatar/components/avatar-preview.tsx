"use client";

import type { CSSProperties } from "react";

import { useTranslation } from "@/features/i18n/use-translation";
import type { FacingDirection } from "@/features/office/utils/player-direction";
import type { AvatarConfig } from "@/types/avatar";

type AvatarPreviewProps = {
  avatar: AvatarConfig | null;
  direction?: FacingDirection;
  showCaption?: boolean;
  size?: "large" | "small";
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

const skinColors: Record<AvatarConfig["skinColor"], string> = {
  light: "#f2c9a5",
  medium: "#c98f5a",
  dark: "#7a4a2a",
};

const skinShadowColors: Record<AvatarConfig["skinColor"], string> = {
  light: "#d99d78",
  medium: "#9f643d",
  dark: "#55301d",
};

const hairColors: Record<AvatarConfig["hairColor"], string> = {
  black: "#171923",
  brown: "#6b3f25",
  blonde: "#d9b44a",
};

const hairShadowColors: Record<AvatarConfig["hairColor"], string> = {
  black: "#07090f",
  brown: "#3f2416",
  blonde: "#9b7624",
};

const shirtColors: Record<AvatarConfig["shirtColor"], string> = {
  blue: "#2f6fed",
  green: "#1fa85b",
  red: "#dc3f4f",
  black: "#202636",
};

const shirtShadowColors: Record<AvatarConfig["shirtColor"], string> = {
  blue: "#1647a7",
  green: "#0d7139",
  red: "#962536",
  black: "#0d111c",
};

const pantsColors: Record<AvatarConfig["pants"], string> = {
  basic: "#3d4b63",
  jeans: "#2456b8",
  shorts: "#53637a",
};

const pantsShadowColors: Record<AvatarConfig["pants"], string> = {
  basic: "#20293a",
  jeans: "#153572",
  shorts: "#313d50",
};

function PixelFace({
  avatar,
  direction,
}: {
  avatar: AvatarConfig;
  direction: FacingDirection;
}) {
  if (direction === "up") {
    return null;
  }

  if (direction === "left" || direction === "right") {
    return (
      <>
        <span className="absolute left-[9px] top-[20px] h-1 w-1 bg-[#10131b]" />
        <span className="absolute -left-1 top-[28px] h-1 w-1 bg-[var(--skin-shadow)]" />
        {avatar.accessory === "glasses" || avatar.face === "cool" ? (
          <span className="absolute left-[5px] top-[17px] h-[9px] w-[13px] border-[3px] border-[#10131b]" />
        ) : null}
        {avatar.face === "smile" ? (
          <span className="absolute left-[8px] top-[34px] h-1 w-2 border-b-2 border-[#6b2631]" />
        ) : (
          <span className="absolute left-[9px] top-[35px] h-1 w-1 bg-[#6b2631]" />
        )}
      </>
    );
  }

  return (
    <>
      {avatar.face === "cool" ? (
        <>
          <span className="absolute left-[7px] top-[18px] h-[9px] w-[16px] bg-[#10131b]" />
          <span className="absolute right-[7px] top-[18px] h-[9px] w-[16px] bg-[#10131b]" />
          <span className="absolute left-[23px] top-[20px] h-1 w-[6px] bg-[#10131b]" />
          <span className="absolute left-[10px] top-[19px] h-[3px] w-[7px] bg-white/35" />
          <span className="absolute right-[12px] top-[19px] h-[3px] w-[7px] bg-white/35" />
        </>
      ) : (
        <>
          <span className="absolute left-[11px] top-[21px] h-1 w-1 bg-[#10131b]" />
          <span className="absolute right-[11px] top-[21px] h-1 w-1 bg-[#10131b]" />
        </>
      )}

      {avatar.accessory === "glasses" && avatar.face !== "cool" ? (
        <>
          <span className="absolute left-[6px] top-[17px] h-[12px] w-[17px] border-[3px] border-[#10131b]" />
          <span className="absolute right-[6px] top-[17px] h-[12px] w-[17px] border-[3px] border-[#10131b]" />
          <span className="absolute left-[22px] top-[20px] h-1 w-2 bg-[#10131b]" />
        </>
      ) : null}

      {avatar.face === "smile" ? (
        <>
          <span className="absolute left-[20px] top-[34px] h-1 w-3 bg-[#6b2631]" />
          <span className="absolute left-[16px] top-[31px] h-1 w-1 bg-[#6b2631]" />
          <span className="absolute right-[16px] top-[31px] h-1 w-1 bg-[#6b2631]" />
        </>
      ) : (
        <span className="absolute left-[22px] top-[34px] h-1 w-2 bg-[#6b2631]" />
      )}
    </>
  );
}

function PixelHair({
  avatar,
  direction,
}: {
  avatar: AvatarConfig;
  direction: FacingDirection;
}) {
  const isSide = direction === "left" || direction === "right";

  if (direction === "up") {
    return (
      <div className="absolute left-3 top-2 h-[54px] w-14 bg-[var(--hair)] shadow-[inset_-6px_-5px_0_var(--hair-shadow)]">
        <span className="absolute left-1 top-1 h-1 w-5 bg-white/15" />
        {avatar.hair === "bob" ? (
          <>
            <span className="absolute -bottom-2 left-0 h-4 w-2 bg-[var(--hair-shadow)]" />
            <span className="absolute -bottom-2 right-0 h-4 w-2 bg-[var(--hair-shadow)]" />
          </>
        ) : null}
        {avatar.hair === "spiky" ? (
          <>
            <span className="absolute -top-2 left-1 h-3 w-2 bg-[var(--hair)]" />
            <span className="absolute -top-3 left-5 h-4 w-2 bg-[var(--hair)]" />
            <span className="absolute -top-2 right-4 h-3 w-2 bg-[var(--hair)]" />
          </>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <div
        className={[
          "absolute top-2 bg-[var(--hair)] shadow-[inset_-5px_-4px_0_var(--hair-shadow)]",
          isSide ? "left-[18px] h-6 w-11" : "left-3 h-6 w-14",
        ].join(" ")}
      >
        <span className="absolute left-1 top-1 h-1 w-4 bg-white/15" />
      </div>

      {avatar.hair === "short" ? (
        <span
          className={[
            "absolute top-7 h-3 w-2 bg-[var(--hair-shadow)]",
            isSide ? "right-[18px]" : "left-3",
          ].join(" ")}
        />
      ) : null}

      {avatar.hair === "bob" ? (
        <>
          <span
            className={[
              "absolute top-6 h-8 w-2 bg-[var(--hair-shadow)]",
              isSide ? "right-[18px]" : "left-3",
            ].join(" ")}
          />
          {!isSide ? (
            <span className="absolute right-3 top-6 h-8 w-2 bg-[var(--hair-shadow)]" />
          ) : null}
        </>
      ) : null}

      {avatar.hair === "spiky" ? (
        <>
          <span className="absolute left-4 top-1 h-3 w-2 bg-[var(--hair)]" />
          <span className="absolute left-8 top-0 h-4 w-2 bg-[var(--hair)]" />
          <span className="absolute right-5 top-1 h-3 w-2 bg-[var(--hair)]" />
        </>
      ) : null}
    </>
  );
}

function PixelCharacter({
  avatar,
  direction,
  ariaLabel,
}: {
  avatar: AvatarConfig;
  direction: FacingDirection;
  ariaLabel: string;
}) {
  const isSide = direction === "left" || direction === "right";
  const isBack = direction === "up";
  const style = {
    "--hair": hairColors[avatar.hairColor],
    "--hair-shadow": hairShadowColors[avatar.hairColor],
    "--pants": pantsColors[avatar.pants],
    "--pants-shadow": pantsShadowColors[avatar.pants],
    "--shirt": shirtColors[avatar.shirtColor],
    "--shirt-shadow": shirtShadowColors[avatar.shirtColor],
    "--skin": skinColors[avatar.skinColor],
    "--skin-shadow": skinShadowColors[avatar.skinColor],
    transform: direction === "right" ? "scaleX(-1)" : undefined,
  } as CSSProperties;

  return (
    <div
      aria-label={ariaLabel}
      className="relative h-32 w-20 [image-rendering:pixelated]"
      role="img"
      style={style}
    >
      <span className="absolute left-[34px] top-[57px] h-2 w-3 bg-[var(--skin-shadow)]" />

      <div
        className={[
          "absolute top-3 bg-[var(--skin)] shadow-[inset_4px_0_0_rgba(255,255,255,0.15),inset_-5px_0_0_var(--skin-shadow)]",
          isSide ? "left-5 h-12 w-[42px]" : "left-[14px] h-12 w-[52px]",
        ].join(" ")}
      >
        {!isBack ? (
          <PixelFace avatar={avatar} direction={direction} />
        ) : null}
      </div>

      {!isSide && !isBack ? (
        <>
          <span className="absolute left-[10px] top-[31px] h-3 w-1 bg-[var(--skin-shadow)]" />
          <span className="absolute right-[10px] top-[31px] h-3 w-1 bg-[var(--skin-shadow)]" />
        </>
      ) : null}

      <PixelHair avatar={avatar} direction={direction} />

      {avatar.accessory === "hat" ? (
        <>
          <span className="absolute left-[15px] top-1 h-3 w-12 bg-[#31936a] shadow-[inset_-5px_0_0_#176044]" />
          <span className="absolute left-[9px] top-3 h-1 w-[58px] bg-[#176044]" />
        </>
      ) : null}

      <div
        className={[
          "absolute top-16 h-9 bg-[var(--shirt)] shadow-[inset_4px_0_0_rgba(255,255,255,0.14),inset_-6px_0_0_var(--shirt-shadow)]",
          isSide ? "left-[22px] w-10" : "left-3 w-14",
        ].join(" ")}
      >
        {avatar.shirt === "hoodie" ? (
          <span
            className={[
              "absolute top-0 h-3 border-b-2 border-[var(--shirt-shadow)]",
              isBack ? "left-2 w-10" : "left-[18px] w-5 border-x-2",
            ].join(" ")}
          />
        ) : null}
        {avatar.shirt === "jacket" ? (
          <>
            <span className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-[var(--shirt-shadow)]" />
            {!isBack ? (
              <span className="absolute left-[13px] top-3 h-1 w-1 bg-[#f1d58a] shadow-[26px_0_0_#f1d58a]" />
            ) : null}
          </>
        ) : null}
        {avatar.shirt === "basic" && !isBack ? (
          <span className="absolute left-[18px] top-2 h-1 w-5 bg-white/12" />
        ) : null}
      </div>

      <span
        className={[
          "absolute top-[68px] h-7 w-2 bg-[var(--skin)] shadow-[inset_-3px_0_0_var(--skin-shadow)]",
          isSide ? "left-[15px]" : "left-1",
        ].join(" ")}
      />
      {!isSide ? (
        <span className="absolute right-1 top-[68px] h-7 w-2 bg-[var(--skin)] shadow-[inset_-3px_0_0_var(--skin-shadow)]" />
      ) : null}

      <span
        className={[
          "absolute top-[100px] h-2 bg-[var(--pants-shadow)]",
          isSide ? "left-[22px] w-10" : "left-4 w-12",
        ].join(" ")}
      />
      <span
        className={[
          "absolute top-[108px] h-3 w-5 bg-[var(--pants)] shadow-[inset_-4px_0_0_var(--pants-shadow)]",
          isSide ? "left-[22px]" : "left-4",
        ].join(" ")}
      />
      <span
        className={[
          "absolute top-[108px] h-3 w-5 bg-[var(--pants)] shadow-[inset_-4px_0_0_var(--pants-shadow)]",
          isSide ? "left-[42px]" : "right-4",
        ].join(" ")}
      />
      {avatar.pants === "shorts" ? (
        <>
          <span
            className={[
              "absolute top-[116px] h-1 w-5 bg-[var(--skin)]",
              isSide ? "left-[22px]" : "left-4",
            ].join(" ")}
          />
          <span
            className={[
              "absolute top-[116px] h-1 w-5 bg-[var(--skin)]",
              isSide ? "left-[42px]" : "right-4",
            ].join(" ")}
          />
        </>
      ) : null}
      <span
        className={[
          "absolute top-[120px] h-2 w-6 bg-[#131722] shadow-[inset_-5px_0_0_#05070c]",
          isSide ? "left-[18px]" : "left-3",
        ].join(" ")}
      />
      <span
        className={[
          "absolute top-[120px] h-2 w-6 bg-[#131722] shadow-[inset_-5px_0_0_#05070c]",
          isSide ? "left-[40px]" : "right-3",
        ].join(" ")}
      />
    </div>
  );
}

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

  if (size === "small") {
    return (
      <div className="h-[88px] w-[58px] overflow-hidden">
        <div className="origin-top-left scale-[0.6875]">{character}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-56 w-40 overflow-hidden rounded-md border border-slate-700 bg-slate-950 shadow-inner">
        <div className="absolute left-[22px] top-[18px] origin-top-left scale-[1.45]">
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
