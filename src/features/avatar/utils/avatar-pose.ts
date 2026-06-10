import type { FacingDirection } from "@/features/office/utils/player-direction";
import type { AvatarHair } from "@/types/avatar";

export type AvatarView = "front" | "back" | "side";

export type AvatarPose = {
  hairSilhouette: `${AvatarHair}-${AvatarView}`;
  isBack: boolean;
  isSide: boolean;
  mirror: boolean;
  showFace: boolean;
  view: AvatarView;
};

export function getAvatarPose(
  direction: FacingDirection,
  hair: AvatarHair,
): AvatarPose {
  const view: AvatarView =
    direction === "up"
      ? "back"
      : direction === "left" || direction === "right"
        ? "side"
        : "front";

  return {
    hairSilhouette: `${hair}-${view}`,
    isBack: view === "back",
    isSide: view === "side",
    mirror: direction === "left",
    showFace: view !== "back",
    view,
  };
}
