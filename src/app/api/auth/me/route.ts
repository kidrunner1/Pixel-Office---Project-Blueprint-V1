import { NextResponse } from "next/server";

import { successResponse, errorResponse } from "@/lib/api/responses";
import { getAuthUser } from "@/lib/auth/session";

export async function GET(): Promise<NextResponse> {
  const user = await getAuthUser();

  if (!user) {
    return errorResponse("Not authenticated.", 401);
  }

  return successResponse(user);
}
