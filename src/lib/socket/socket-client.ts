"use client";

import { io, type Socket } from "socket.io-client";

import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/types/socket";

export type PixelOfficeSocket = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>;

let socketClient: PixelOfficeSocket | null = null;

export function getSocketClient(): PixelOfficeSocket | null {
  if (typeof window === "undefined") {
    return null;
  }

  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

  if (!socketUrl) {
    return null;
  }

  if (!socketClient) {
    socketClient = io(socketUrl, {
      autoConnect: false,
    });
  }

  return socketClient;
}

export function disconnectSocketClient(): void {
  if (!socketClient) {
    return;
  }

  socketClient.disconnect();
  socketClient = null;
}
