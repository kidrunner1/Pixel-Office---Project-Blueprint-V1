"use client";

import { useEffect, useState } from "react";

import { ChatPanel } from "@/features/chat/components/chat-panel";
import { OfficeMainStage } from "@/features/office/components/office-main-stage";
import { OfficeSidebar } from "@/features/office/components/office-sidebar";
import { OfficeTopbar } from "@/features/office/components/office-topbar";
import { useKeyboardMovement } from "@/features/office/hooks/use-keyboard-movement";
import { useOfficeSocket } from "@/features/office/hooks/use-office-socket";
import { useRoomStore } from "@/stores/room-store";

type OfficeShellProps = {
  currentUserId: string;
  currentUserName: string;
  currentUserRole: string;
};

export function OfficeShell({
  currentUserId,
  currentUserName,
  currentUserRole,
}: OfficeShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const room = useRoomStore((state) => state.room);
  const myMember = useRoomStore((state) => state.myMember);
  const isLoading = useRoomStore((state) => state.isLoading);
  const error = useRoomStore((state) => state.error);
  const isFull = useRoomStore((state) => state.isFull);
  const fetchRoom = useRoomStore((state) => state.fetchRoom);
  const joinRoom = useRoomStore((state) => state.joinRoom);
  const leaveRoom = useRoomStore((state) => state.leaveRoom);

  useEffect(() => {
    void fetchRoom(currentUserId);
  }, [currentUserId, fetchRoom]);

  const activeMembers =
    room?.roomMembers.filter((member) => member.isOnline) ?? [];
  const hasJoined = Boolean(myMember);
  const { blockedMessage, facingDirection, isMoving } = useKeyboardMovement({
    currentUserId,
    isUpdatePending: isLoading,
    myMember,
    room,
  });
  const { error: realtimeError, isConnected } = useOfficeSocket({
    currentUserName,
    isEnabled: hasJoined,
    myMember,
    room,
  });
  const displayRoomName =
    room?.name === "Main Office" ? undefined : room?.name;

  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden bg-[#020617] text-white">
      <OfficeTopbar
        activeMemberCount={activeMembers.length}
        currentUserName={currentUserName}
        isConnected={isConnected}
        maxMembers={room?.maxMembers ?? 4}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        roomName={displayRoomName}
      />

      <div className="flex min-h-0 flex-1">
        <OfficeSidebar
          currentUserId={currentUserId}
          currentUserName={currentUserName}
          currentUserRole={currentUserRole}
          isOpen={isSidebarOpen}
          maxMembers={room?.maxMembers ?? 4}
          members={activeMembers}
          myMember={myMember}
          onClose={() => setIsSidebarOpen(false)}
        />

        <OfficeMainStage
          blockedMessage={blockedMessage}
          currentUserDirection={facingDirection}
          currentUserId={currentUserId}
          error={error}
          hasJoined={hasJoined}
          isFull={isFull}
          isLoading={isLoading}
          isMoving={isMoving}
          onJoin={() => void joinRoom(currentUserId)}
          onLeave={() => void leaveRoom(currentUserId)}
          realtimeError={realtimeError}
          room={room}
        />

        <ChatPanel
          currentUserId={currentUserId}
          currentUserName={currentUserName}
          isJoined={hasJoined}
          isRealtimeConnected={isConnected}
          roomId={room?.id ?? null}
        />
      </div>
    </div>
  );
}
