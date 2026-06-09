import { NextResponse } from "next/server";

import { successResponse, errorResponse } from "@/lib/api/responses";
import { getAuthUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import {
  avatarConfigSchema,
  updateAvatarSchema,
} from "@/lib/validations/avatar";
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

  const parsedBody = updateAvatarSchema.safeParse(body);

  if (!parsedBody.success) {
    return errorResponse("Invalid avatar data.", 400);
  }

  const avatar = await prisma.avatar.upsert({
    where: {
      userId: user.id,
    },
    create: {
      userId: user.id,
      hair: parsedBody.data.hair,
      hairColor: parsedBody.data.hairColor,
      face: parsedBody.data.face,
      skinColor: parsedBody.data.skinColor,
      shirt: parsedBody.data.shirt,
      shirtColor: parsedBody.data.shirtColor,
      pants: parsedBody.data.pants,
      accessory: parsedBody.data.accessory ?? null,
    },
    update: {
      hair: parsedBody.data.hair,
      hairColor: parsedBody.data.hairColor,
      face: parsedBody.data.face,
      skinColor: parsedBody.data.skinColor,
      shirt: parsedBody.data.shirt,
      shirtColor: parsedBody.data.shirtColor,
      pants: parsedBody.data.pants,
      accessory: parsedBody.data.accessory ?? null,
    },
    select: avatarSelect,
  });

  return successResponse(toAvatarConfig(avatar));
}
