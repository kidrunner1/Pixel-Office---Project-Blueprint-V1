import { z } from "zod";

import {
  MAIN_OFFICE_HEIGHT,
  MAIN_OFFICE_WIDTH,
} from "@/features/office/maps/main-office-map";

export const roomMemberStatusOptions = [
  "online",
  "focus",
  "meeting",
  "break",
  "away",
] as const;

export const roomMemberStatusSchema = z.enum(roomMemberStatusOptions);

export const updateRoomMemberSchema = z.object({
  positionX: z.number().int().min(0).max(MAIN_OFFICE_WIDTH - 1),
  positionY: z.number().int().min(0).max(MAIN_OFFICE_HEIGHT - 1),
  status: roomMemberStatusSchema,
  todayTask: z.string().trim().max(120).optional(),
});

export type UpdateRoomMemberInput = z.infer<typeof updateRoomMemberSchema>;
