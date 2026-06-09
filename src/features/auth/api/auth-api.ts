import type { LoginInput, RegisterInput } from "@/lib/validations/auth";
import type { SafeUser } from "@/types/user";

type ApiSuccessResponse<TData> = {
  success: true;
  data: TData;
};

type ApiErrorResponse = {
  success: false;
  message: string;
};

type LogoutResult = {
  success: true;
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

  const createdAt =
    value.createdAt instanceof Date
      ? value.createdAt
      : typeof value.createdAt === "string"
        ? new Date(value.createdAt)
        : null;

  if (!createdAt || Number.isNaN(createdAt.getTime())) {
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

function parseLogoutResult(value: unknown): LogoutResult | null {
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
      throw new Error(body.message);
    }

    throw new Error("Something went wrong. Please try again.");
  }

  if (!isApiSuccessResponse(body)) {
    throw new Error("Unexpected response from server.");
  }

  const parsedData = parseData(body.data);

  if (!parsedData) {
    throw new Error("Unexpected response from server.");
  }

  return parsedData;
}

export function registerUser(input: RegisterInput): Promise<SafeUser> {
  return requestJson(
    "/api/auth/register",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    parseSafeUser,
  );
}

export function loginUser(input: LoginInput): Promise<SafeUser> {
  return requestJson(
    "/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    parseSafeUser,
  );
}

export async function logoutUser(): Promise<void> {
  await requestJson(
    "/api/auth/logout",
    {
      method: "POST",
    },
    parseLogoutResult,
  );
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body = await readJsonBody(response);

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    if (isApiErrorResponse(body)) {
      throw new Error(body.message);
    }

    throw new Error("Unable to load the current user.");
  }

  if (!isApiSuccessResponse(body)) {
    throw new Error("Unexpected response from server.");
  }

  const user = parseSafeUser(body.data);

  if (!user) {
    throw new Error("Unexpected response from server.");
  }

  return user;
}
