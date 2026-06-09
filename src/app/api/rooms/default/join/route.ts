import { NextResponse } from "next/server";

import { successResponse, errorResponse } from "@/lib/api/responses";
import { getAuthUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import {
  getAvailableRoomSlot,
  getOrCreateDefaultRoom,
  roomMemberSelect,
  toRoomMemberView,
} from "@/lib/room/default-room";

export async function POST(): Promise<NextResponse> {
  const user = await getAuthUser();

  if (!user) {
    return errorResponse("Not authenticated.", 401);
  }

  const room = await getOrCreateDefaultRoom();

  const existingMember = await prisma.roomMember.findUnique({
    where: {
      userId_roomId: {
        userId: user.id,
        roomId: room.id,
      },
    },
    select: roomMemberSelect,
  });

  if (existingMember?.isOnline) {
    return successResponse({
      member: toRoomMemberView(existingMember),
    });
  }

  const activeMembers = await prisma.roomMember.findMany({
    where: {
      roomId: room.id,
      isOnline: true,
    },
    select: {
      positionX: true,
      positionY: true,
    },
  });

  if (activeMembers.length >= room.maxMembers) {
    return errorResponse("Office is full", 409);
  }

  if (existingMember) {
    const updatedMember = await prisma.roomMember.update({
      where: {
        id: existingMember.id,
      },
      data: {
        isOnline: true,
      },
      select: roomMemberSelect,
    });

    return successResponse({
      member: toRoomMemberView(updatedMember),
    });
  }

  const slot = getAvailableRoomSlot(activeMembers);

  const member = await prisma.roomMember.create({
    data: {
      userId: user.id,
      roomId: room.id,
      positionX: slot.positionX,
      positionY: slot.positionY,
      isOnline: true,
    },
    select: roomMemberSelect,
  });

  return successResponse(
    {
      member: toRoomMemberView(member),
    },
    { status: 201 },
  );
}
