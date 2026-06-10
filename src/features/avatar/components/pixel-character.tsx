import type { CSSProperties } from "react";

import {
  getAvatarPose,
  type AvatarPose,
} from "@/features/avatar/utils/avatar-pose";
import type { FacingDirection } from "@/features/office/utils/player-direction";
import type { AvatarConfig } from "@/types/avatar";

const skinColors: Record<AvatarConfig["skinColor"], string> = {
  light: "#f3cba8",
  medium: "#ca915d",
  dark: "#7d4b2c",
};

const skinHighlightColors: Record<AvatarConfig["skinColor"], string> = {
  light: "#ffe0c2",
  medium: "#e7af78",
  dark: "#a66a42",
};

const skinShadowColors: Record<AvatarConfig["skinColor"], string> = {
  light: "#d49370",
  medium: "#9b603a",
  dark: "#512d1c",
};

const hairColors: Record<AvatarConfig["hairColor"], string> = {
  black: "#202431",
  brown: "#75452a",
  blonde: "#dfb94d",
};

const hairHighlightColors: Record<AvatarConfig["hairColor"], string> = {
  black: "#3b4152",
  brown: "#a7673d",
  blonde: "#f4d574",
};

const hairShadowColors: Record<AvatarConfig["hairColor"], string> = {
  black: "#080b12",
  brown: "#3f2416",
  blonde: "#96711f",
};

const shirtColors: Record<AvatarConfig["shirtColor"], string> = {
  blue: "#3478ee",
  green: "#25aa62",
  red: "#df4657",
  black: "#293143",
};

const shirtHighlightColors: Record<AvatarConfig["shirtColor"], string> = {
  blue: "#68a0ff",
  green: "#55d68b",
  red: "#ff7884",
  black: "#4a566d",
};

const shirtShadowColors: Record<AvatarConfig["shirtColor"], string> = {
  blue: "#1647a7",
  green: "#0d7139",
  red: "#942636",
  black: "#101522",
};

const pantsColors: Record<AvatarConfig["pants"], string> = {
  basic: "#46546c",
  jeans: "#2c61bf",
  shorts: "#5b6a80",
};

const pantsHighlightColors: Record<AvatarConfig["pants"], string> = {
  basic: "#65748d",
  jeans: "#4f83df",
  shorts: "#7d8ba0",
};

const pantsShadowColors: Record<AvatarConfig["pants"], string> = {
  basic: "#20293a",
  jeans: "#153572",
  shorts: "#303b4c",
};

const PIXEL_OUTLINE = "#080b12";

type CharacterPartProps = {
  avatar: AvatarConfig;
  pose: AvatarPose;
};

function PixelHair({ avatar, pose }: CharacterPartProps) {
  if (pose.isBack) {
    return (
      <>
        <span className="absolute left-[10px] top-[5px] h-[45px] w-[52px] bg-[var(--outline)]" />
        <span className="absolute left-[14px] top-[5px] h-[8px] w-[44px] bg-[var(--hair)]" />
        <span className="absolute left-[10px] top-[13px] h-[30px] w-[52px] bg-[var(--hair)] shadow-[inset_5px_0_0_var(--hair-highlight),inset_-7px_0_0_var(--hair-shadow)]" />
        <span className="absolute left-[15px] top-[39px] h-[11px] w-[42px] bg-[var(--hair-shadow)]" />

        {avatar.hair === "bob" ? (
          <>
            <span className="absolute left-[7px] top-[22px] h-[33px] w-[11px] bg-[var(--outline)]" />
            <span className="absolute right-[7px] top-[22px] h-[33px] w-[11px] bg-[var(--outline)]" />
            <span className="absolute left-[11px] top-[22px] h-[29px] w-[7px] bg-[var(--hair)]" />
            <span className="absolute right-[11px] top-[22px] h-[29px] w-[7px] bg-[var(--hair-shadow)]" />
          </>
        ) : null}

        {avatar.hair === "spiky" ? (
          <>
            <span className="absolute left-[13px] top-0 h-[10px] w-[10px] bg-[var(--outline)]" />
            <span className="absolute left-[28px] -top-1 h-[13px] w-[10px] bg-[var(--outline)]" />
            <span className="absolute right-[12px] top-0 h-[11px] w-[10px] bg-[var(--outline)]" />
            <span className="absolute left-[17px] top-0 h-[9px] w-[6px] bg-[var(--hair)]" />
            <span className="absolute left-[32px] -top-1 h-[12px] w-[6px] bg-[var(--hair)]" />
            <span className="absolute right-[16px] top-0 h-[10px] w-[6px] bg-[var(--hair)]" />
          </>
        ) : null}
      </>
    );
  }

  if (pose.isSide) {
    return (
      <>
        <span className="absolute left-[17px] top-[5px] h-[25px] w-[43px] bg-[var(--outline)]" />
        <span className="absolute left-[21px] top-[5px] h-[17px] w-[35px] bg-[var(--hair)] shadow-[inset_5px_0_0_var(--hair-highlight),inset_-6px_0_0_var(--hair-shadow)]" />
        <span className="absolute left-[17px] top-[18px] h-[18px] w-[11px] bg-[var(--outline)]" />
        <span className="absolute left-[21px] top-[18px] h-[14px] w-[7px] bg-[var(--hair-shadow)]" />

        {avatar.hair === "bob" ? (
          <>
            <span className="absolute left-[13px] top-[24px] h-[31px] w-[15px] bg-[var(--outline)]" />
            <span className="absolute left-[17px] top-[24px] h-[27px] w-[11px] bg-[var(--hair-shadow)]" />
            <span className="absolute left-[24px] top-[42px] h-[13px] w-[14px] bg-[var(--outline)]" />
            <span className="absolute left-[28px] top-[42px] h-[9px] w-[10px] bg-[var(--hair)]" />
          </>
        ) : null}

        {avatar.hair === "spiky" ? (
          <>
            <span className="absolute left-[20px] top-0 h-[11px] w-[9px] bg-[var(--outline)]" />
            <span className="absolute left-[34px] -top-1 h-[13px] w-[10px] bg-[var(--outline)]" />
            <span className="absolute right-[10px] top-[1px] h-[11px] w-[10px] bg-[var(--outline)]" />
            <span className="absolute left-[24px] top-0 h-[10px] w-[5px] bg-[var(--hair)]" />
            <span className="absolute left-[38px] -top-1 h-[12px] w-[6px] bg-[var(--hair)]" />
            <span className="absolute right-[14px] top-[1px] h-[10px] w-[6px] bg-[var(--hair)]" />
          </>
        ) : null}
      </>
    );
  }

  return (
    <>
      <span className="absolute left-[8px] top-[5px] h-[25px] w-[56px] bg-[var(--outline)]" />
      <span className="absolute left-[12px] top-[5px] h-[17px] w-[48px] bg-[var(--hair)] shadow-[inset_5px_0_0_var(--hair-highlight),inset_-7px_0_0_var(--hair-shadow)]" />
      <span className="absolute left-[8px] top-[18px] h-[18px] w-[12px] bg-[var(--outline)]" />
      <span className="absolute left-[12px] top-[18px] h-[14px] w-[8px] bg-[var(--hair-shadow)]" />

      {avatar.hair === "short" ? (
        <>
          <span className="absolute left-[27px] top-[18px] h-[9px] w-[9px] bg-[var(--hair)]" />
          <span className="absolute left-[47px] top-[18px] h-[7px] w-[9px] bg-[var(--hair-shadow)]" />
        </>
      ) : null}

      {avatar.hair === "bob" ? (
        <>
          <span className="absolute left-[7px] top-[23px] h-[31px] w-[13px] bg-[var(--outline)]" />
          <span className="absolute right-[7px] top-[23px] h-[31px] w-[13px] bg-[var(--outline)]" />
          <span className="absolute left-[11px] top-[23px] h-[27px] w-[9px] bg-[var(--hair)]" />
          <span className="absolute right-[11px] top-[23px] h-[27px] w-[9px] bg-[var(--hair-shadow)]" />
        </>
      ) : null}

      {avatar.hair === "spiky" ? (
        <>
          <span className="absolute left-[12px] top-0 h-[11px] w-[10px] bg-[var(--outline)]" />
          <span className="absolute left-[27px] -top-1 h-[13px] w-[10px] bg-[var(--outline)]" />
          <span className="absolute right-[20px] top-0 h-[11px] w-[10px] bg-[var(--outline)]" />
          <span className="absolute right-[7px] top-[4px] h-[10px] w-[10px] bg-[var(--outline)]" />
          <span className="absolute left-[16px] top-0 h-[10px] w-[6px] bg-[var(--hair)]" />
          <span className="absolute left-[31px] -top-1 h-[12px] w-[6px] bg-[var(--hair)]" />
          <span className="absolute right-[24px] top-0 h-[10px] w-[6px] bg-[var(--hair)]" />
          <span className="absolute right-[11px] top-[4px] h-[9px] w-[6px] bg-[var(--hair-shadow)]" />
        </>
      ) : null}
    </>
  );
}

function PixelFace({ avatar, pose }: CharacterPartProps) {
  if (!pose.showFace) {
    return null;
  }

  if (pose.isSide) {
    return (
      <>
        <span className="absolute left-[48px] top-[26px] h-[5px] w-[5px] bg-[var(--outline)]" />
        <span className="absolute left-[55px] top-[33px] h-[5px] w-[5px] bg-[var(--skin)]" />
        <span className="absolute left-[52px] top-[40px] h-[4px] w-[7px] bg-[#782f38]" />
        {avatar.face === "smile" ? (
          <span className="absolute left-[48px] top-[40px] h-[4px] w-[4px] bg-[#782f38]" />
        ) : null}
        {avatar.face === "cool" || avatar.accessory === "glasses" ? (
          <>
            <span className="absolute left-[43px] top-[22px] h-[13px] w-[15px] bg-[var(--outline)]" />
            <span className="absolute left-[47px] top-[26px] h-[5px] w-[7px] bg-[#263346]" />
          </>
        ) : null}
      </>
    );
  }

  const wearsDarkGlasses =
    avatar.face === "cool" || avatar.accessory === "glasses";

  return (
    <>
      {wearsDarkGlasses ? (
        <>
          <span className="absolute left-[18px] top-[23px] h-[13px] w-[17px] bg-[var(--outline)]" />
          <span className="absolute right-[18px] top-[23px] h-[13px] w-[17px] bg-[var(--outline)]" />
          <span className="absolute left-[35px] top-[27px] h-[4px] w-[4px] bg-[var(--outline)]" />
          <span className="absolute left-[22px] top-[27px] h-[5px] w-[9px] bg-[#263346]" />
          <span className="absolute right-[22px] top-[27px] h-[5px] w-[9px] bg-[#263346]" />
          <span className="absolute left-[23px] top-[27px] h-[3px] w-[4px] bg-white/40" />
          <span className="absolute right-[27px] top-[27px] h-[3px] w-[4px] bg-white/40" />
        </>
      ) : (
        <>
          <span className="absolute left-[24px] top-[28px] h-[5px] w-[5px] bg-[var(--outline)]" />
          <span className="absolute right-[24px] top-[28px] h-[5px] w-[5px] bg-[var(--outline)]" />
          <span className="absolute left-[25px] top-[28px] h-[2px] w-[2px] bg-white/50" />
          <span className="absolute right-[27px] top-[28px] h-[2px] w-[2px] bg-white/50" />
        </>
      )}

      <span className="absolute left-[34px] top-[36px] h-[4px] w-[4px] bg-[var(--skin-shadow)]" />

      {avatar.face === "smile" ? (
        <>
          <span className="absolute left-[28px] top-[43px] h-[4px] w-[16px] bg-[#782f38]" />
          <span className="absolute left-[25px] top-[40px] h-[4px] w-[4px] bg-[#782f38]" />
          <span className="absolute right-[25px] top-[40px] h-[4px] w-[4px] bg-[#782f38]" />
        </>
      ) : (
        <span className="absolute left-[32px] top-[43px] h-[4px] w-[8px] bg-[#782f38]" />
      )}
    </>
  );
}

function PixelTorso({ avatar, pose }: CharacterPartProps) {
  const torsoClass = pose.isSide
    ? "left-[21px] w-[36px]"
    : "left-[14px] w-[44px]";

  return (
    <>
      <span
        className={[
          "absolute top-[53px] h-[36px] bg-[var(--outline)]",
          torsoClass,
        ].join(" ")}
      />
      <span
        className={[
          "absolute top-[57px] h-[28px] bg-[var(--shirt)] shadow-[inset_5px_0_0_var(--shirt-highlight),inset_-6px_0_0_var(--shirt-shadow)]",
          pose.isSide ? "left-[25px] w-[28px]" : "left-[18px] w-[36px]",
        ].join(" ")}
      >
        {avatar.shirt === "basic" && !pose.isBack ? (
          <span className="absolute left-[12px] top-0 h-[5px] w-[12px] bg-[var(--shirt-highlight)]" />
        ) : null}

        {avatar.shirt === "hoodie" ? (
          <span
            className={[
              "absolute top-0 h-[10px] border-[4px] border-[var(--shirt-shadow)] border-t-0",
              pose.isBack ? "left-[6px] w-[24px]" : "left-[9px] w-[18px]",
            ].join(" ")}
          />
        ) : null}

        {avatar.shirt === "jacket" ? (
          <>
            <span className="absolute left-1/2 top-0 h-full w-[4px] -translate-x-1/2 bg-[var(--shirt-shadow)]" />
            {!pose.isBack ? (
              <>
                <span className="absolute left-[7px] top-[9px] h-[4px] w-[4px] bg-[#f2d47b]" />
                <span className="absolute right-[7px] top-[9px] h-[4px] w-[4px] bg-[#f2d47b]" />
              </>
            ) : null}
          </>
        ) : null}
      </span>
      <span
        className={[
          "absolute top-[85px] h-[7px] bg-[var(--pants-shadow)]",
          pose.isSide ? "left-[23px] w-[32px]" : "left-[16px] w-[40px]",
        ].join(" ")}
      />
    </>
  );
}

function PixelArms({ pose }: Pick<CharacterPartProps, "pose">) {
  if (pose.isSide) {
    return (
      <>
        <span className="absolute left-[15px] top-[58px] h-[30px] w-[12px] bg-[var(--outline)]" />
        <span className="absolute left-[19px] top-[62px] h-[17px] w-[8px] bg-[var(--shirt-shadow)]" />
        <span className="absolute left-[19px] top-[79px] h-[9px] w-[8px] bg-[var(--skin)] shadow-[inset_-3px_0_0_var(--skin-shadow)]" />
      </>
    );
  }

  return (
    <>
      <span className="absolute left-[4px] top-[58px] h-[30px] w-[14px] bg-[var(--outline)]" />
      <span className="absolute right-[4px] top-[58px] h-[30px] w-[14px] bg-[var(--outline)]" />
      <span className="absolute left-[8px] top-[62px] h-[17px] w-[10px] bg-[var(--shirt)] shadow-[inset_4px_0_0_var(--shirt-highlight)]" />
      <span className="absolute right-[8px] top-[62px] h-[17px] w-[10px] bg-[var(--shirt-shadow)]" />
      <span className="absolute left-[8px] top-[79px] h-[9px] w-[10px] bg-[var(--skin)] shadow-[inset_3px_0_0_var(--skin-highlight)]" />
      <span className="absolute right-[8px] top-[79px] h-[9px] w-[10px] bg-[var(--skin)] shadow-[inset_-3px_0_0_var(--skin-shadow)]" />
    </>
  );
}

function PixelLegs({ avatar, pose }: CharacterPartProps) {
  const legTop = avatar.pants === "shorts" ? "top-[91px]" : "top-[89px]";

  if (pose.isSide) {
    return (
      <>
        <span className="absolute left-[21px] top-[88px] h-[20px] w-[36px] bg-[var(--outline)]" />
        <span
          className={[
            "avatar-leg-left absolute left-[25px] h-[15px] w-[13px] bg-[var(--pants)] shadow-[inset_4px_0_0_var(--pants-highlight)]",
            legTop,
          ].join(" ")}
        >
          {avatar.pants === "shorts" ? (
            <span className="absolute bottom-0 left-0 h-[5px] w-full bg-[var(--skin)]" />
          ) : null}
          <span className="absolute -bottom-[7px] left-[-4px] h-[8px] w-[20px] bg-[var(--outline)]" />
          <span className="absolute -bottom-[3px] left-0 h-[4px] w-[16px] bg-[#202738]" />
        </span>
        <span
          className={[
            "avatar-leg-right absolute left-[40px] h-[15px] w-[13px] bg-[var(--pants-shadow)]",
            legTop,
          ].join(" ")}
        >
          {avatar.pants === "shorts" ? (
            <span className="absolute bottom-0 left-0 h-[5px] w-full bg-[var(--skin-shadow)]" />
          ) : null}
          <span className="absolute -bottom-[7px] left-0 h-[8px] w-[19px] bg-[var(--outline)]" />
          <span className="absolute -bottom-[3px] left-0 h-[4px] w-[15px] bg-[#101521]" />
        </span>
      </>
    );
  }

  return (
    <>
      <span className="absolute left-[14px] top-[88px] h-[20px] w-[44px] bg-[var(--outline)]" />
      <span
        className={[
          "avatar-leg-left absolute left-[18px] h-[15px] w-[16px] bg-[var(--pants)] shadow-[inset_4px_0_0_var(--pants-highlight)]",
          legTop,
        ].join(" ")}
      >
        {avatar.pants === "shorts" ? (
          <span className="absolute bottom-0 left-0 h-[5px] w-full bg-[var(--skin)] shadow-[inset_4px_0_0_var(--skin-highlight)]" />
        ) : null}
        <span className="absolute -bottom-[7px] left-[-4px] h-[8px] w-[22px] bg-[var(--outline)]" />
        <span className="absolute -bottom-[3px] left-0 h-[4px] w-[18px] bg-[#202738]" />
      </span>
      <span
        className={[
          "avatar-leg-right absolute right-[18px] h-[15px] w-[16px] bg-[var(--pants)] shadow-[inset_-4px_0_0_var(--pants-shadow)]",
          legTop,
        ].join(" ")}
      >
        {avatar.pants === "shorts" ? (
          <span className="absolute bottom-0 left-0 h-[5px] w-full bg-[var(--skin)] shadow-[inset_-4px_0_0_var(--skin-shadow)]" />
        ) : null}
        <span className="absolute -bottom-[7px] right-[-4px] h-[8px] w-[22px] bg-[var(--outline)]" />
        <span className="absolute -bottom-[3px] right-0 h-[4px] w-[18px] bg-[#101521]" />
      </span>
    </>
  );
}

function PixelAccessory({ avatar, pose }: CharacterPartProps) {
  if (avatar.accessory !== "hat") {
    return null;
  }

  return (
    <>
      <span
        className={[
          "absolute top-0 h-[13px] bg-[var(--outline)]",
          pose.isSide ? "left-[20px] w-[39px]" : "left-[10px] w-[52px]",
        ].join(" ")}
      />
      <span
        className={[
          "absolute top-0 h-[9px] bg-[#36a575] shadow-[inset_-6px_0_0_#176044]",
          pose.isSide ? "left-[24px] w-[31px]" : "left-[14px] w-[44px]",
        ].join(" ")}
      />
      <span
        className={[
          "absolute top-[9px] h-[7px] bg-[var(--outline)]",
          pose.isSide ? "left-[20px] w-[46px]" : "left-[6px] w-[60px]",
        ].join(" ")}
      />
      <span
        className={[
          "absolute top-[9px] h-[3px] bg-[#176044]",
          pose.isSide ? "left-[24px] w-[38px]" : "left-[10px] w-[52px]",
        ].join(" ")}
      />
    </>
  );
}

export function PixelCharacter({
  ariaLabel,
  avatar,
  direction,
}: {
  ariaLabel: string;
  avatar: AvatarConfig;
  direction: FacingDirection;
}) {
  const pose = getAvatarPose(direction, avatar.hair);
  const style = {
    "--hair": hairColors[avatar.hairColor],
    "--hair-highlight": hairHighlightColors[avatar.hairColor],
    "--hair-shadow": hairShadowColors[avatar.hairColor],
    "--outline": PIXEL_OUTLINE,
    "--pants": pantsColors[avatar.pants],
    "--pants-highlight": pantsHighlightColors[avatar.pants],
    "--pants-shadow": pantsShadowColors[avatar.pants],
    "--shirt": shirtColors[avatar.shirtColor],
    "--shirt-highlight": shirtHighlightColors[avatar.shirtColor],
    "--shirt-shadow": shirtShadowColors[avatar.shirtColor],
    "--skin": skinColors[avatar.skinColor],
    "--skin-highlight": skinHighlightColors[avatar.skinColor],
    "--skin-shadow": skinShadowColors[avatar.skinColor],
    transform: pose.mirror ? "scaleX(-1)" : undefined,
  } as CSSProperties;

  return (
    <div
      aria-label={ariaLabel}
      className="relative h-28 w-[72px] origin-center [image-rendering:pixelated]"
      data-avatar-hair={pose.hairSilhouette}
      data-avatar-view={pose.view}
      role="img"
      style={style}
    >
      <span
        className={[
          "absolute top-[49px] h-[12px] w-[16px] bg-[var(--outline)]",
          pose.isSide ? "left-[31px]" : "left-[28px]",
        ].join(" ")}
      />
      <span
        className={[
          "absolute top-[49px] h-[8px] w-[8px] bg-[var(--skin-shadow)]",
          pose.isSide ? "left-[35px]" : "left-[32px]",
        ].join(" ")}
      />

      <span
        className={[
          "absolute top-[9px] h-[44px] bg-[var(--outline)]",
          pose.isSide ? "left-[18px] w-[44px]" : "left-[10px] w-[52px]",
        ].join(" ")}
      />
      <span
        className={[
          "absolute top-[13px] h-[36px] bg-[var(--skin)] shadow-[inset_5px_0_0_var(--skin-highlight),inset_-6px_0_0_var(--skin-shadow)]",
          pose.isSide ? "left-[22px] w-[36px]" : "left-[14px] w-[44px]",
        ].join(" ")}
      />

      {!pose.isSide && !pose.isBack ? (
        <>
          <span className="absolute left-[6px] top-[27px] h-[14px] w-[8px] bg-[var(--outline)]" />
          <span className="absolute right-[6px] top-[27px] h-[14px] w-[8px] bg-[var(--outline)]" />
          <span className="absolute left-[10px] top-[31px] h-[6px] w-[4px] bg-[var(--skin-shadow)]" />
          <span className="absolute right-[10px] top-[31px] h-[6px] w-[4px] bg-[var(--skin-shadow)]" />
        </>
      ) : null}

      <PixelFace avatar={avatar} pose={pose} />
      <PixelHair avatar={avatar} pose={pose} />
      <PixelAccessory avatar={avatar} pose={pose} />
      <PixelArms pose={pose} />
      <PixelTorso avatar={avatar} pose={pose} />
      <PixelLegs avatar={avatar} pose={pose} />
    </div>
  );
}
