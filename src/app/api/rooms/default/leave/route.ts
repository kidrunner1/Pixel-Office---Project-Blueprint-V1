import { NextResponse } from "next/server";

import { successResponse, errorResponse } from "@/lib/api/responses";
import { getAuthUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { getOrCreateDefaultRoom } from "@/lib/room/default-room";

export async function POST(): Promise<NextResponse> {
  const user = await getAuthUser();

  if (!user) {
    return errorResponse("Not authenticated.", 401);
  }

  const room = await getOrCreateDefaultRoom();

  await prisma.roomMember.updateMany({
    where: {
      userId: user.id,
      roomId: room.id,
    },
    data: {
      isOnline: false,
    },
  });

  return successResponse({ success: true });
}
