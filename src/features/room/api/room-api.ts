import { avatarConfigSchema } from "@/lib/validations/avatar";
import { roomMemberStatusSchema } from "@/lib/validations/room";
import type { UpdateRoomMemberInput } from "@/lib/validations/room";
import type { JoinRoomResponse, RoomMemberView, RoomView } from "@/types/room";
import type { SafeUser } from "@/types/user";

type ApiSuccessResponse<TData> = {
  success: true;
  data: TData;
};

type ApiErrorResponse = {
  success: false;
  message: string;
};

type LeaveRoomResult = {
  success: true;
};

export class RoomApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "RoomApiError";
    this.status = status;
  }
}

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

function parseDate(value: unknown): Date | null {
  const date = value instanceof Date
    ? value
    : typeof value === "string"
      ? new Date(value)
      : null;

  if (!date || Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function parseSafeUser(value: unknown): SafeUser | null {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    typeof value.name !== "string" ||
    typeof value.email !== "string" ||
    typeof value.role !== "string"
  ) {
    return null;
  }

  const createdAt = parseDate(value.createdAt);

  if (!createdAt) {
    return null;
  }

  return {
    id: value.id,
    name: value.name,
    email: value.email,
    role: value.role,
    createdAt,
  };
}

function parseRoomMember(value: unknown): RoomMemberView | null {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    typeof value.userId !== "string" ||
    typeof value.roomId !== "string" ||
    typeof value.positionX !== "number" ||
    typeof value.positionY !== "number" ||
    typeof value.todayTask !== "string" && value.todayTask !== null ||
    typeof value.isOnline !== "boolean"
  ) {
    return null;
  }

  const status = roomMemberStatusSchema.safeParse(value.status);
  const user = parseSafeUser(value.user);
  const avatar =
    value.avatar === null ? null : avatarConfigSchema.safeParse(value.avatar);

  if (!status.success || !user) {
    return null;
  }

  if (avatar !== null && !avatar.success) {
    return null;
  }

  return {
    id: value.id,
    userId: value.userId,
    roomId: value.roomId,
    positionX: value.positionX,
    positionY: value.positionY,
    status: status.data,
    todayTask: value.todayTask,
    isOnline: value.isOnline,
    user,
    avatar: avatar === null ? null : avatar.data,
  };
}

function parseRoom(value: unknown): RoomView | null {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    typeof value.name !== "string" ||
    typeof value.maxMembers !== "number" ||
    !Array.isArray(value.roomMembers)
  ) {
    return null;
  }

  const roomMembers = value.roomMembers.map(parseRoomMember);

  if (roomMembers.some((member) => member === null)) {
    return null;
  }

  return {
    id: value.id,
    name: value.name,
    maxMembers: value.maxMembers,
    roomMembers: roomMembers.filter((member): member is RoomMemberView =>
      member !== null
    ),
  };
}

function parseJoinRoomResponse(value: unknown): JoinRoomResponse | null {
  if (!isRecord(value)) {
    return null;
  }

  const member = parseRoomMember(value.member);

  if (!member) {
    return null;
  }

  return { member };
}

function parseLeaveRoomResult(value: unknown): LeaveRoomResult | null {
  if (!isRecord(value) || value.success !== true) {
    return null;
  }

  return {
    success: true,
  };
}

async function readJsonBody(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function requestJson<TData>(
  path: string,
  init: RequestInit,
  parseData: (value: unknown) => TData | null,
): Promise<TData> {
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
      throw new RoomApiError(body.message, response.status);
    }

    throw new RoomApiError("Room request failed.", response.status);
  }

  if (!isApiSuccessResponse(body)) {
    throw new RoomApiError("Unexpected response from server.", response.status);
  }

  const parsedData = parseData(body.data);

  if (!parsedData) {
    throw new RoomApiError("Unexpected response from server.", response.status);
  }

  return parsedData;
}

export function getDefaultRoom(): Promise<RoomView> {
  return requestJson(
    "/api/rooms/default",
    {
      method: "GET",
    },
    parseRoom,
  );
}

export function joinDefaultRoom(): Promise<JoinRoomResponse> {
  return requestJson(
    "/api/rooms/default/join",
    {
      method: "POST",
    },
    parseJoinRoomResponse,
  );
}

export async function leaveDefaultRoom(): Promise<void> {
  await requestJson(
    "/api/rooms/default/leave",
    {
      method: "POST",
    },
    parseLeaveRoomResult,
  );
}

export function updateMyRoomMember(
  input: UpdateRoomMemberInput,
): Promise<RoomMemberView> {
  return requestJson(
    "/api/rooms/default/member",
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
    parseRoomMember,
  );
}
