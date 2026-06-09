"use client";

import { useEffect, type CSSProperties } from "react";

import { ChatInput } from "@/features/chat/components/chat-input";
import { ChatMessageList } from "@/features/chat/components/chat-message-list";
import { getDesktopChatWidth } from "@/features/chat/utils/chat-layout";
import { useTranslation } from "@/features/i18n/use-translation";
import { useChatStore } from "@/stores/chat-store";

type ChatPanelProps = {
  currentUserId: string;
  currentUserName: string;
  isJoined: boolean;
  isRealtimeConnected: boolean;
  roomId: string | null;
};

const DESKTOP_CHAT_QUERY = "(min-width: 1280px)";

function ChatGlyph() {
  return (
    <span
      aria-hidden="true"
      className="relative block h-4 w-5 border-2 border-current after:absolute after:-bottom-1.5 after:left-1 after:h-1.5 after:w-1.5 after:border-b-2 after:border-l-2 after:border-current after:bg-[#091426]"
    />
  );
}

export function ChatPanel({
  currentUserId,
  currentUserName,
  isJoined,
  isRealtimeConnected,
  roomId,
}: ChatPanelProps) {
  const { t } = useTranslation();
  const messages = useChatStore((state) => state.messages);
  const unreadCount = useChatStore((state) => state.unreadCount);
  const isOpen = useChatStore((state) => state.isOpen);
  const setOpen = useChatStore((state) => state.setOpen);
  const panelStyle = {
    "--desktop-chat-width": `${getDesktopChatWidth(isOpen)}px`,
  } as CSSProperties;

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_CHAT_QUERY);

    function syncChatForViewport(event: MediaQueryListEvent | MediaQueryList) {
      setOpen(event.matches);
    }

    syncChatForViewport(mediaQuery);
    mediaQuery.addEventListener("change", syncChatForViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncChatForViewport);
    };
  }, [setOpen]);

  return (
    <>
      {!isOpen ? (
        <button
          className="fixed bottom-4 right-4 z-[4800] border-2 border-cyan-200 bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950 shadow-[4px_4px_0_#155e75] transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 xl:hidden"
          onClick={() => setOpen(true)}
          type="button"
        >
          {t("chat.open")}
          {unreadCount > 0 ? ` (${unreadCount})` : ""}
        </button>
      ) : null}

      <aside
        aria-label={t("chat.label")}
        className={[
          "fixed inset-x-2 bottom-2 z-[4700] flex h-[min(44dvh,420px)] min-h-0 flex-col border-2 border-cyan-900 bg-[#091426] shadow-[0_-8px_30px_rgba(2,6,23,0.65)] transition-transform duration-200 ease-out motion-reduce:transition-none xl:static xl:z-auto xl:h-auto xl:w-[var(--desktop-chat-width)] xl:shrink-0 xl:translate-y-0 xl:border-x-0 xl:border-y-0 xl:border-l xl:shadow-none xl:transition-[width]",
          isOpen
            ? "translate-y-0"
            : "pointer-events-none translate-y-[calc(100%+1rem)] xl:pointer-events-auto",
        ].join(" ")}
        style={panelStyle}
      >
        {!isOpen ? (
          <button
            aria-label={t("chat.expand")}
            className="relative hidden h-full w-full flex-col items-center gap-3 border-0 bg-[#091426] py-3 text-cyan-200 transition hover:bg-cyan-950/60 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-300 xl:flex"
            onClick={() => setOpen(true)}
            type="button"
          >
            <ChatGlyph />
            {unreadCount > 0 ? (
              <span className="grid min-h-5 min-w-5 place-items-center bg-cyan-300 px-1 text-[10px] font-bold text-slate-950">
                {unreadCount}
              </span>
            ) : null}
            <span
              aria-label={
                isRealtimeConnected
                  ? t("chat.realtimeConnected")
                  : t("chat.realtimeDisconnected")
              }
              className={[
                "mt-auto h-2 w-2",
                isRealtimeConnected ? "bg-emerald-300" : "bg-slate-500",
              ].join(" ")}
              role="img"
            />
          </button>
        ) : null}

        <div
          className={[
            "min-h-0 flex-1 flex-col",
            isOpen ? "flex" : "flex xl:hidden",
          ].join(" ")}
        >
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-800 bg-[#0b1729] px-2.5 py-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-sm font-semibold text-slate-100">
                  {t("chat.title")}
                </h2>
                {unreadCount > 0 ? (
                  <span className="bg-cyan-300 px-1.5 py-0.5 text-[10px] font-bold text-slate-950">
                    {unreadCount}
                  </span>
                ) : null}
              </div>
              <p className="mt-0.5 text-[11px] text-slate-500">
                {isRealtimeConnected
                  ? t("common.connected")
                  : t("common.disconnected")}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button
                aria-label={t("chat.collapse")}
                className="hidden h-8 w-8 place-items-center border border-slate-700 bg-slate-950 text-slate-300 transition hover:border-cyan-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 xl:grid"
                onClick={() => setOpen(false)}
                type="button"
              >
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rotate-45 border-b-2 border-l-2 border-current"
                />
              </button>
              <button
                className="border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:border-cyan-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 xl:hidden"
                onClick={() => setOpen(false)}
                type="button"
              >
                {t("common.close")}
              </button>
            </div>
          </div>

          <ChatMessageList messages={messages} />

          <ChatInput
            currentUserId={currentUserId}
            currentUserName={currentUserName}
            isJoined={isJoined}
            isRealtimeConnected={isRealtimeConnected}
            roomId={roomId}
          />
        </div>
      </aside>
    </>
  );
}
