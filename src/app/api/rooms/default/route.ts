import { NextResponse } from "next/server";

import { successResponse, errorResponse } from "@/lib/api/responses";
import { getAuthUser } from "@/lib/auth/session";
import { getDefaultRoomView } from "@/lib/room/default-room";

export async function GET(): Promise<NextResponse> {
  const user = await getAuthUser();

  if (!user) {
    return errorResponse("Not authenticated.", 401);
  }

  const room = await getDefaultRoomView();

  return successResponse(room);
}
