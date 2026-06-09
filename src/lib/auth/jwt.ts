import { sign, verify } from "jsonwebtoken";
import type { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

import type { AuthTokenPayload } from "@/types/user";

const AUTH_TOKEN_EXPIRES_IN: SignOptions["expiresIn"] = "7d";

function getJwtSecret(): Secret {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return secret;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isAuthTokenPayload(value: unknown): value is AuthTokenPayload {
  return (
    isRecord(value) &&
    typeof value.userId === "string" &&
    typeof value.email === "string" &&
    typeof value.role === "string"
  );
}

export function signAuthToken(payload: AuthTokenPayload): string {
  return sign(payload, getJwtSecret(), {
    expiresIn: AUTH_TOKEN_EXPIRES_IN,
  });
}

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  try {
    const decoded: string | JwtPayload = verify(token, getJwtSecret());

    if (!isAuthTokenPayload(decoded)) {
      return null;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}
