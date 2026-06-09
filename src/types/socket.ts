import type { AvatarConfig } from "@/types/avatar";
import type { RoomMemberStatus } from "@/types/room";

export type SocketRoomMember = {
  userId: string;
  name: string;
  roomId: string;
  positionX: number;
  positionY: number;
  avatar?: AvatarConfig | null;
  status: RoomMemberStatus;
  todayTask: string | null;
};

export type SocketRoomState = {
  roomId: string;
  members: SocketRoomMember[];
};

export type JoinRoomPayload = SocketRoomMember;

export type LeaveRoomPayload = {
  roomId: string;
  userId: string;
};

export type PlayerMovePayload = {
  roomId: string;
  userId: string;
  positionX: number;
  positionY: number;
};

export type SendMessagePayload = {
  roomId: string;
  userId: string;
  userName: string;
  content: string;
};

export type SocketChatMessage = {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
};

export type PlayerLeftPayload = {
  roomId: string;
  userId: string;
};

export type SocketErrorPayload = {
  message: string;
};

export type ClientToServerEvents = {
  join_room: (payload: JoinRoomPayload) => void;
  leave_room: (payload: LeaveRoomPayload) => void;
  player_move: (payload: PlayerMovePayload) => void;
  send_message: (payload: SendMessagePayload) => void;
};

export type ServerToClientEvents = {
  room_state: (payload: SocketRoomState) => void;
  player_joined: (payload: SocketRoomMember) => void;
  player_left: (payload: PlayerLeftPayload) => void;
  player_moved: (payload: SocketRoomMember) => void;
  message_received: (payload: SocketChatMessage) => void;
  room_full: (payload: SocketErrorPayload) => void;
  socket_error: (payload: SocketErrorPayload) => void;
};
