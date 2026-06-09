"use client";

import { useEffect, useRef } from "react";

import { useTranslation } from "@/features/i18n/use-translation";
import type { SocketChatMessage } from "@/types/socket";

type ChatMessageListProps = {
  messages: SocketChatMessage[];
};

function formatMessageTime(createdAt: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(createdAt));
}

export function ChatMessageList({
  messages,
}: ChatMessageListProps) {
  const { locale, t } = useTranslation();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;

    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="grid min-h-0 flex-1 place-items-center border border-dashed border-slate-700 bg-slate-950/40 px-4 py-8 text-center text-sm text-slate-400">
        {t("chat.noMessages")}
      </div>
    );
  }

  return (
    <div
      className="min-h-0 flex-1 space-y-2 overflow-y-auto border border-slate-800 bg-slate-950/60 p-3"
      ref={listRef}
    >
      {messages.map((message) => (
        <article
          className="border border-slate-800 bg-white/[0.035] p-2.5"
          key={message.id}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="truncate text-xs font-semibold text-cyan-200">
              {message.userName}
            </p>
            <time
              className="shrink-0 text-xs text-slate-500"
              dateTime={message.createdAt}
            >
              {formatMessageTime(
                message.createdAt,
                locale === "th" ? "th-TH" : "en-US",
              )}
            </time>
          </div>
          <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-5 text-slate-200">
            {message.content}
          </p>
        </article>
      ))}
    </div>
  );
}
