import { z } from "zod";

export const avatarHairOptions = ["short", "bob", "spiky"] as const;
export const avatarHairColorOptions = ["black", "brown", "blonde"] as const;
export const avatarFaceOptions = ["default", "smile", "cool"] as const;
export const avatarSkinColorOptions = ["light", "medium", "dark"] as const;
export const avatarShirtOptions = ["basic", "hoodie", "jacket"] as const;
export const avatarShirtColorOptions = ["blue", "green", "red", "black"] as const;
export const avatarPantsOptions = ["basic", "jeans", "shorts"] as const;
export const avatarAccessoryOptions = ["none", "glasses", "hat"] as const;

export const avatarConfigSchema = z.object({
  hair: z.enum(avatarHairOptions),
  hairColor: z.enum(avatarHairColorOptions),
  face: z.enum(avatarFaceOptions),
  skinColor: z.enum(avatarSkinColorOptions),
  shirt: z.enum(avatarShirtOptions),
  shirtColor: z.enum(avatarShirtColorOptions),
  pants: z.enum(avatarPantsOptions),
  accessory: z.enum(avatarAccessoryOptions).nullable(),
});

export const updateAvatarSchema = avatarConfigSchema.extend({
  accessory: z.enum(avatarAccessoryOptions).nullable().optional(),
});

export type AvatarConfigInput = z.infer<typeof avatarConfigSchema>;
export type UpdateAvatarSchemaInput = z.infer<typeof updateAvatarSchema>;
