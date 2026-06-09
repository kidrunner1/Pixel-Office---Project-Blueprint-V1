import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";
import { avatarConfigSchema } from "@/lib/validations/avatar";
import { roomMemberStatusSchema } from "@/lib/validations/room";
import type { RoomMemberView, RoomView } from "@/types/room";

export const DEFAULT_ROOM_NAME = "Main Office";

export const DEFAULT_ROOM_SLOTS = [
  { positionX: 2, positionY: 2 },
  { positionX: 6, positionY: 2 },
  { positionX: 2, positionY: 6 },
  { positionX: 12, positionY: 7 },
] as const;

const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
} as const;

export const roomMemberSelect = {
  id: true,
  userId: true,
  roomId: true,
  positionX: true,
  positionY: true,
  status: true,
  todayTask: true,
  isOnline: true,
  user: {
    select: {
      ...safeUserSelect,
      avatar: {
        select: {
          hair: true,
          hairColor: true,
          face: true,
          skinColor: true,
          shirt: true,
          shirtColor: true,
          pants: true,
          accessory: true,
        },
      },
    },
  },
} satisfies Prisma.RoomMemberSelect;

type SelectedRoomMember = Prisma.RoomMemberGetPayload<{
  select: typeof roomMemberSelect;
}>;

type DefaultRoomRecord = {
  id: string;
  name: string;
  maxMembers: number;
};

export async function getOrCreateDefaultRoom(): Promise<DefaultRoomRecord> {
  const existingRoom = await prisma.room.findFirst({
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      name: true,
      maxMembers: true,
    },
  });

  if (existingRoom) {
    return existingRoom;
  }

  return prisma.room.create({
    data: {
      name: DEFAULT_ROOM_NAME,
      maxMembers: 4,
    },
    select: {
      id: true,
      name: true,
      maxMembers: true,
    },
  });
}

export function toRoomMemberView(member: SelectedRoomMember): RoomMemberView {
  return {
    id: member.id,
    userId: member.userId,
    roomId: member.roomId,
    positionX: member.positionX,
    positionY: member.positionY,
    status: roomMemberStatusSchema.parse(member.status),
    todayTask: member.todayTask,
    isOnline: member.isOnline,
    user: {
      id: member.user.id,
      name: member.user.name,
      email: member.user.email,
      role: member.user.role,
      createdAt: member.user.createdAt,
    },
    avatar: member.user.avatar
      ? avatarConfigSchema.parse(member.user.avatar)
      : null,
  };
}

export async function getDefaultRoomView(): Promise<RoomView> {
  const room = await getOrCreateDefaultRoom();

  const roomWithMembers = await prisma.room.findUniqueOrThrow({
    where: {
      id: room.id,
    },
    select: {
      id: true,
      name: true,
      maxMembers: true,
      roomMembers: {
        orderBy: {
          createdAt: "asc",
        },
        select: roomMemberSelect,
      },
    },
  });

  return {
    id: roomWithMembers.id,
    name: roomWithMembers.name,
    maxMembers: roomWithMembers.maxMembers,
    roomMembers: roomWithMembers.roomMembers.map(toRoomMemberView),
  };
}

export function getAvailableRoomSlot(
  activeMembers: Array<{ positionX: number; positionY: number }>,
) {
  const occupiedPositions = new Set(
    activeMembers.map(
      (member) => `${member.positionX}:${member.positionY}`,
    ),
  );

  return (
    DEFAULT_ROOM_SLOTS.find(
      (slot) =>
        !occupiedPositions.has(`${slot.positionX}:${slot.positionY}`),
    ) ?? DEFAULT_ROOM_SLOTS[activeMembers.length]
  );
}
