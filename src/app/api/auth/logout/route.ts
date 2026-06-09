import { NextResponse } from "next/server";

import { successResponse } from "@/lib/api/responses";
import { clearAuthCookie } from "@/lib/auth/session";

export async function POST(): Promise<NextResponse> {
  await clearAuthCookie();

  return successResponse({ success: true });
}
