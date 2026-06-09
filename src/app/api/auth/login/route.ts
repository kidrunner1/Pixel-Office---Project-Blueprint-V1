import { NextResponse } from "next/server";

import { successResponse, errorResponse } from "@/lib/api/responses";
import { signAuthToken } from "@/lib/auth/jwt";
import { comparePassword } from "@/lib/auth/password";
import { setAuthCookie } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { loginSchema } from "@/lib/validations/auth";

const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
} as const;

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON request body.", 400);
  }

  const parsedBody = loginSchema.safeParse(body);

  if (!parsedBody.success) {
    return errorResponse("Invalid login data.", 400);
  }

  const email = parsedBody.data.email.toLowerCase();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      ...safeUserSelect,
      passwordHash: true,
    },
  });

  if (!user) {
    return errorResponse("Invalid email or password.", 401);
  }

  const isPasswordValid = await comparePassword(
    parsedBody.data.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    return errorResponse("Invalid email or password.", 401);
  }

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };

  const token = signAuthToken({
    userId: safeUser.id,
    email: safeUser.email,
    role: safeUser.role,
  });

  await setAuthCookie(token);

  return successResponse(safeUser);
}
