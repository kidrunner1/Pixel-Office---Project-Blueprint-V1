import { NextResponse } from "next/server";

import { successResponse, errorResponse } from "@/lib/api/responses";
import { getAuthUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { avatarConfigSchema } from "@/lib/validations/avatar";
import type { AvatarConfig } from "@/types/avatar";

const avatarSelect = {
  hair: true,
  hairColor: true,
  face: true,
  skinColor: true,
  shirt: true,
  shirtColor: true,
  pants: true,
  accessory: true,
} as const;

function toAvatarConfig(value: unknown): AvatarConfig {
  return avatarConfigSchema.parse(value);
}

export async function GET(): Promise<NextResponse> {
  const user = await getAuthUser();

  if (!user) {
    return errorResponse("Not authenticated.", 401);
  }

  const avatar = await prisma.avatar.upsert({
    where: {
      userId: user.id,
    },
    create: {
      userId: user.id,
      accessory: null,
    },
    update: {},
    select: avatarSelect,
  });

  return successResponse(toAvatarConfig(avatar));
}
