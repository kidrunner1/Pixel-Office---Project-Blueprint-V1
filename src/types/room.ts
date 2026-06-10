import type { AvatarConfig } from "@/types/avatar";
import type { SafeUser } from "@/types/user";

export type RoomMemberStatus =
  | "online"
  | "focus"
  | "meeting"
  | "break"
  | "away";

export type RoomMemberView = {
  id: string;
  userId: string;
  roomId: string;
  positionX: number;
  positionY: number;
  status: RoomMemberStatus;
  todayTask: string | null;
  isOnline: boolean;
  user: SafeUser;
  avatar: AvatarConfig | null;
};

export type RoomView = {
  id: string;
  name: string;
  maxMembers: number;
  roomMembers: RoomMemberView[];
};

export type JoinRoomResponse = {
  member: RoomMemberView;
};
