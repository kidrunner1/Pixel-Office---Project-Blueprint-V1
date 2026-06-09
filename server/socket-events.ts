export const CLIENT_SOCKET_EVENTS = {
  JOIN_ROOM: "join_room",
  LEAVE_ROOM: "leave_room",
  PLAYER_MOVE: "player_move",
  SEND_MESSAGE: "send_message",
} as const;

export const SERVER_SOCKET_EVENTS = {
  ROOM_STATE: "room_state",
  PLAYER_JOINED: "player_joined",
  PLAYER_LEFT: "player_left",
  PLAYER_MOVED: "player_moved",
  MESSAGE_RECEIVED: "message_received",
  ROOM_FULL: "room_full",
  SOCKET_ERROR: "socket_error",
} as const;
