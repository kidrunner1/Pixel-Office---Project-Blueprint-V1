"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { useTranslation } from "@/features/i18n/use-translation";
import { getSocketClient } from "@/lib/socket/socket-client";

type ChatInputProps = {
  currentUserId: string;
  currentUserName: string;
  isJoined: boolean;
  isRealtimeConnected: boolean;
  roomId: string | null;
};

const MAX_MESSAGE_LENGTH = 500;

export function ChatInput({
  currentUserId,
  currentUserName,
  isJoined,
  isRealtimeConnected,
  roomId,
}: ChatInputProps) {
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const trimmedContent = content.trim();
  const canSend =
    Boolean(roomId) &&
    isJoined &&
    isRealtimeConnected &&
    trimmedContent.length > 0;
  const placeholder = !isJoined
    ? t("chat.joinToChat")
    : isRealtimeConnected
      ? t("chat.messageOffice")
      : t("chat.realtimeDisconnected");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSend || !roomId) {
      return;
    }

    const socket = getSocketClient();

    if (!socket?.connected) {
      return;
    }

    socket.emit("send_message", {
      roomId,
      userId: currentUserId,
      userName: currentUserName,
      content: trimmedContent,
    });
    setContent("");
  }

  return (
    <form
      className="shrink-0 border-t border-slate-800 bg-[#0a1425] p-2.5"
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor="office-chat-message">
        {t("chat.messageLabel")}
      </label>
      <div className="flex items-end gap-2">
        <input
          className="min-h-11 min-w-0 flex-1 border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 disabled:cursor-not-allowed disabled:text-slate-500"
          disabled={!isJoined || !isRealtimeConnected}
          id="office-chat-message"
          maxLength={MAX_MESSAGE_LENGTH}
          onChange={(event) => setContent(event.target.value)}
          placeholder={placeholder}
          value={content}
        />
        <button
          className="min-h-11 border border-cyan-200 bg-cyan-300 px-3 py-2 text-sm font-bold text-slate-950 shadow-[2px_2px_0_#155e75] transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none"
          disabled={!canSend}
          type="submit"
        >
          {t("chat.send")}
        </button>
      </div>
      <p className="mt-1.5 text-right text-[11px] text-slate-500">
        {content.length}/{MAX_MESSAGE_LENGTH}
      </p>
    </form>
  );
}
