import { createServer } from "node:http";

import { Server } from "socket.io";

import {
  CLIENT_SOCKET_EVENTS,
  SERVER_SOCKET_EVENTS,
} from "./socket-events.ts";
import { createSocketRoomState } from "./socket-room-state.ts";
import {
  getSocketAllowedOrigin,
  getSocketPort,
  handleSocketHealthRequest,
} from "./socket-runtime.ts";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "./socket-types.ts";

const port = getSocketPort();
const clientOrigin = getSocketAllowedOrigin();
const isDevelopment = process.env.NODE_ENV !== "production";

const httpServer = createServer((request, response) => {
  handleSocketHealthRequest(request, response);
});
const roomState = createSocketRoomState();

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: clientOrigin,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  if (isDevelopment) {
    console.log(`Socket connected: ${socket.id}`);
  }

  socket.on(CLIENT_SOCKET_EVENTS.JOIN_ROOM, (payload) => {
    const result = roomState.joinRoom({
      ...payload,
      socketId: socket.id,
    });

    if (!result.ok) {
      socket.emit(SERVER_SOCKET_EVENTS.ROOM_FULL, {
        message: result.message,
      });
      return;
    }

    socket.join(payload.roomId);

    if (result.isNewMember) {
      socket.to(payload.roomId).emit(SERVER_SOCKET_EVENTS.PLAYER_JOINED, result.member);
    }

    io.to(payload.roomId).emit(SERVER_SOCKET_EVENTS.ROOM_STATE, result.roomState);
  });

  socket.on(CLIENT_SOCKET_EVENTS.LEAVE_ROOM, (payload) => {
    const result = roomState.leaveRoom(payload);
    socket.leave(payload.roomId);

    if (!result) {
      return;
    }

    io.to(payload.roomId).emit(SERVER_SOCKET_EVENTS.PLAYER_LEFT, {
      roomId: payload.roomId,
      userId: payload.userId,
    });
    io.to(payload.roomId).emit(SERVER_SOCKET_EVENTS.ROOM_STATE, result.roomState);
  });

  socket.on(CLIENT_SOCKET_EVENTS.PLAYER_MOVE, (payload) => {
    const result = roomState.movePlayer(payload);

    if (!result.ok) {
      socket.emit(SERVER_SOCKET_EVENTS.SOCKET_ERROR, {
        message: result.message,
      });
      return;
    }

    io.to(payload.roomId).emit(SERVER_SOCKET_EVENTS.PLAYER_MOVED, result.member);
    io.to(payload.roomId).emit(SERVER_SOCKET_EVENTS.ROOM_STATE, result.roomState);
  });

  socket.on(CLIENT_SOCKET_EVENTS.SEND_MESSAGE, (payload) => {
    const result = roomState.createMessage(payload);

    if (!result.ok) {
      socket.emit(SERVER_SOCKET_EVENTS.SOCKET_ERROR, {
        message: result.message,
      });
      return;
    }

    io.to(payload.roomId).emit(
      SERVER_SOCKET_EVENTS.MESSAGE_RECEIVED,
      result.message,
    );
  });

  socket.on("disconnect", () => {
    const result = roomState.removeSocketMember(socket.id);

    if (!result) {
      return;
    }

    io.to(result.member.roomId).emit(SERVER_SOCKET_EVENTS.PLAYER_LEFT, {
      roomId: result.member.roomId,
      userId: result.member.userId,
    });
    io.to(result.member.roomId).emit(
      SERVER_SOCKET_EVENTS.ROOM_STATE,
      result.roomState,
    );

    if (isDevelopment) {
      console.log(`Socket disconnected: ${socket.id}`);
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Socket server running on http://localhost:${port}`);
});
