"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslation } from "@/features/i18n/use-translation";
import { buildSocketPresencePayload } from "@/features/office/utils/sync-socket-presence";
import {
  disconnectSocketClient,
  getSocketClient,
} from "@/lib/socket/socket-client";
import type {
  JoinRoomPayload,
  SocketChatMessage,
  SocketRoomMember,
  SocketRoomState,
} from "@/types/socket";
import type { RoomMemberView, RoomView } from "@/types/room";
import { useChatStore } from "@/stores/chat-store";
import { useRoomStore } from "@/stores/room-store";
import { useSpeechBubbleStore } from "@/stores/speech-bubble-store";

type UseOfficeSocketInput = {
  currentUserName: string;
  isEnabled: boolean;
  myMember: RoomMemberView | null;
  room: RoomView | null;
};

type UseOfficeSocketResult = {
  error: string | null;
  isConnected: boolean;
  roomState: SocketRoomState | null;
};

export function useOfficeSocket({
  currentUserName,
  isEnabled,
  myMember,
  room,
}: UseOfficeSocketInput): UseOfficeSocketResult {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomState, setRoomState] = useState<SocketRoomState | null>(null);
  const addMessage = useChatStore((state) => state.addMessage);
  const showBubble = useSpeechBubbleStore((state) => state.showBubble);
  const applyRealtimeRoomState = useRoomStore(
    (state) => state.applyRealtimeRoomState,
  );
  const updateRealtimeMemberPosition = useRoomStore(
    (state) => state.updateRealtimeMemberPosition,
  );
  const latestJoinPayload = useRef<JoinRoomPayload | null>(null);
  const roomId = room?.id ?? null;
  const userId = myMember?.userId ?? null;
  const isSocketUrlConfigured = Boolean(process.env.NEXT_PUBLIC_SOCKET_URL);

  useEffect(() => {
    latestJoinPayload.current = myMember
      ? buildSocketPresencePayload(currentUserName, myMember)
      : null;
  }, [currentUserName, myMember]);

  useEffect(() => {
    if (!isEnabled || !roomId || !userId) {
      return;
    }

    const socket = getSocketClient();

    if (!socket) {
      return;
    }

    const activeSocket = socket;
    const activeUserId = userId;

    function joinCurrentRoom() {
      const payload = latestJoinPayload.current;

      if (!payload) {
        return;
      }

      activeSocket.emit("join_room", payload);
    }

    function handleConnect() {
      setIsConnected(true);
      setError(null);
      setRoomState(null);
      joinCurrentRoom();
    }

    function handleDisconnect() {
      setIsConnected(false);
    }

    function handleRoomState(nextRoomState: SocketRoomState) {
      setRoomState(nextRoomState);
      applyRealtimeRoomState(activeUserId, nextRoomState);
    }

    function handlePlayerMoved(member: SocketRoomMember) {
      updateRealtimeMemberPosition(activeUserId, member);
    }

    function handleMessageReceived(message: SocketChatMessage) {
      addMessage(message);
      showBubble(message.userId, message.content);
    }

    function handleRoomFull(payload: { message: string }) {
      setError(
        payload.message === "Office is full"
          ? t("office.full")
          : payload.message,
      );
    }

    function handleSocketError(payload: { message: string }) {
      setError(
        payload.message === "Office is full"
          ? t("office.full")
          : t("office.realtimeError"),
      );
    }

    activeSocket.on("connect", handleConnect);
    activeSocket.on("disconnect", handleDisconnect);
    activeSocket.on("room_state", handleRoomState);
    activeSocket.on("player_moved", handlePlayerMoved);
    activeSocket.on("message_received", handleMessageReceived);
    activeSocket.on("room_full", handleRoomFull);
    activeSocket.on("socket_error", handleSocketError);

    if (activeSocket.connected) {
      handleConnect();
    } else {
      activeSocket.connect();
    }

    return () => {
      activeSocket.emit("leave_room", {
        roomId,
        userId: activeUserId,
      });
      activeSocket.off("connect", handleConnect);
      activeSocket.off("disconnect", handleDisconnect);
      activeSocket.off("room_state", handleRoomState);
      activeSocket.off("player_moved", handlePlayerMoved);
      activeSocket.off("message_received", handleMessageReceived);
      activeSocket.off("room_full", handleRoomFull);
      activeSocket.off("socket_error", handleSocketError);
      disconnectSocketClient();
    };
  }, [
    addMessage,
    applyRealtimeRoomState,
    showBubble,
    updateRealtimeMemberPosition,
    isEnabled,
    roomId,
    userId,
    t,
  ]);

  return {
    error:
      isEnabled && !isSocketUrlConfigured
        ? t("office.socketUrlMissing")
        : isEnabled
          ? error
          : null,
    isConnected: isEnabled ? isConnected : false,
    roomState: isEnabled ? roomState : null,
  };
}
