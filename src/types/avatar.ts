export type AvatarHair = "short" | "bob" | "spiky";
export type AvatarHairColor = "black" | "brown" | "blonde";
export type AvatarFace = "default" | "smile" | "cool";
export type AvatarSkinColor = "light" | "medium" | "dark";
export type AvatarShirt = "basic" | "hoodie" | "jacket";
export type AvatarShirtColor = "blue" | "green" | "red" | "black";
export type AvatarPants = "basic" | "jeans" | "shorts";
export type AvatarAccessory = "none" | "glasses" | "hat";

export type AvatarConfig = {
  hair: AvatarHair;
  hairColor: AvatarHairColor;
  face: AvatarFace;
  skinColor: AvatarSkinColor;
  shirt: AvatarShirt;
  shirtColor: AvatarShirtColor;
  pants: AvatarPants;
  accessory: AvatarAccessory | null;
};

export type UpdateAvatarInput = Omit<AvatarConfig, "accessory"> & {
  accessory?: AvatarAccessory | null;
};
