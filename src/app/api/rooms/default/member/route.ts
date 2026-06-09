import { NextResponse } from "next/server";

import { successResponse, errorResponse } from "@/lib/api/responses";
import { getAuthUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import {
  getOrCreateDefaultRoom,
  roomMemberSelect,
  toRoomMemberView,
} from "@/lib/room/default-room";
import { updateRoomMemberSchema } from "@/lib/validations/room";

export async function PATCH(request: Request): Promise<NextResponse> {
  const user = await getAuthUser();

  if (!user) {
    return errorResponse("Not authenticated.", 401);
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON request body.", 400);
  }

  const parsedBody = updateRoomMemberSchema.safeParse(body);

  if (!parsedBody.success) {
    return errorResponse("Invalid room member data.", 400);
  }

  const room = await getOrCreateDefaultRoom();

  const existingMember = await prisma.roomMember.findUnique({
    where: {
      userId_roomId: {
        userId: user.id,
        roomId: room.id,
      },
    },
    select: {
      id: true,
    },
  });

  if (!existingMember) {
    return errorResponse("Join the office before updating your status.", 404);
  }

  const updatedMember = await prisma.roomMember.update({
    where: {
      id: existingMember.id,
    },
    data: {
      positionX: parsedBody.data.positionX,
      positionY: parsedBody.data.positionY,
      status: parsedBody.data.status,
      todayTask:
        parsedBody.data.todayTask !== undefined
          ? parsedBody.data.todayTask || null
          : undefined,
    },
    select: roomMemberSelect,
  });

  return successResponse(toRoomMemberView(updatedMember));
}
