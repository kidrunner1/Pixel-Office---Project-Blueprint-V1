import type { AvatarConfig, UpdateAvatarInput } from "@/types/avatar";

type ApiSuccessResponse<TData> = {
  success: true;
  data: TData;
};

type ApiErrorResponse = {
  success: false;
  message: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return (
    isRecord(value) &&
    value.success === false &&
    typeof value.message === "string"
  );
}

function isApiSuccessResponse(
  value: unknown,
): value is ApiSuccessResponse<unknown> {
  return isRecord(value) && value.success === true && "data" in value;
}

function parseAvatarConfig(value: unknown): AvatarConfig | null {
  if (
    !isRecord(value) ||
    typeof value.hair !== "string" ||
    typeof value.hairColor !== "string" ||
    typeof value.face !== "string" ||
    typeof value.skinColor !== "string" ||
    typeof value.shirt !== "string" ||
    typeof value.shirtColor !== "string" ||
    typeof value.pants !== "string" ||
    !(
      typeof value.accessory === "string" ||
      value.accessory === null
    )
  ) {
    return null;
  }

  return {
    hair: value.hair as AvatarConfig["hair"],
    hairColor: value.hairColor as AvatarConfig["hairColor"],
    face: value.face as AvatarConfig["face"],
    skinColor: value.skinColor as AvatarConfig["skinColor"],
    shirt: value.shirt as AvatarConfig["shirt"],
    shirtColor: value.shirtColor as AvatarConfig["shirtColor"],
    pants: value.pants as AvatarConfig["pants"],
    accessory: value.accessory as AvatarConfig["accessory"],
  };
}

async function readJsonBody(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function requestAvatar(
  path: string,
  init: RequestInit,
): Promise<AvatarConfig> {
  const response = await fetch(path, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  const body = await readJsonBody(response);

  if (!response.ok) {
    if (isApiErrorResponse(body)) {
      throw new Error(body.message);
    }

    throw new Error("Unable to save avatar. Please try again.");
  }

  if (!isApiSuccessResponse(body)) {
    throw new Error("Unexpected response from server.");
  }

  const avatar = parseAvatarConfig(body.data);

  if (!avatar) {
    throw new Error("Unexpected response from server.");
  }

  return avatar;
}

export function getMyAvatar(): Promise<AvatarConfig> {
  return requestAvatar("/api/avatar/me", {
    method: "GET",
  });
}

export function updateMyAvatar(
  input: UpdateAvatarInput,
): Promise<AvatarConfig> {
  return requestAvatar("/api/avatar", {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}
