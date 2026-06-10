type SocketEnvironment = Readonly<Record<string, string | undefined>>;

type SocketHealthRequest = {
  method?: string;
  url?: string;
};

type SocketHealthResponse = {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
};

const DEVELOPMENT_APP_ORIGIN = "http://localhost:3000";

export function getSocketPort(
  environment: SocketEnvironment = process.env,
): number {
  return Number(environment.PORT ?? environment.SOCKET_PORT ?? 4000);
}

export function getSocketAllowedOrigin(
  environment: SocketEnvironment = process.env,
): string {
  if (environment.NODE_ENV !== "production") {
    return DEVELOPMENT_APP_ORIGIN;
  }

  const appOrigin = environment.APP_ORIGIN;

  if (!appOrigin) {
    throw new Error("APP_ORIGIN is required in production");
  }

  return appOrigin;
}

export function handleSocketHealthRequest(
  request: SocketHealthRequest,
  response: SocketHealthResponse,
): boolean {
  if (request.method !== "GET" || request.url !== "/health") {
    return false;
  }

  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.end(
    JSON.stringify({
      success: true,
      service: "pixel-office-socket",
    }),
  );

  return true;
}
