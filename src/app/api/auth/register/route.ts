import { NextResponse } from "next/server";

import { signAuthToken } from "@/lib/auth/jwt";
import { hashPassword } from "@/lib/auth/password";
import { setAuthCookie } from "@/lib/auth/session";
import { successResponse, errorResponse } from "@/lib/api/responses";
import { prisma } from "@/lib/db/prisma";
import { registerSchema } from "@/lib/validations/auth";

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

  const parsedBody = registerSchema.safeParse(body);

  if (!parsedBody.success) {
    return errorResponse("Invalid registration data.", 400);
  }

  const email = parsedBody.data.email.toLowerCase();
  const name = parsedBody.data.name;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (existingUser) {
    return errorResponse("An account with this email already exists.", 409);
  }

  const passwordHash = await hashPassword(parsedBody.data.password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      avatar: {
        create: {},
      },
    },
    select: safeUserSelect,
  });

  const token = signAuthToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  await setAuthCookie(token);

  return successResponse(user, { status: 201 });
}
