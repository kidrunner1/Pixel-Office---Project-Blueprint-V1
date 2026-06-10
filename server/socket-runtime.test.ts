import assert from "node:assert/strict";
import { test } from "node:test";

import {
  getSocketAllowedOrigin,
  getSocketPort,
  handleSocketHealthRequest,
} from "./socket-runtime.ts";

test("uses the hosting PORT before SOCKET_PORT", () => {
  assert.equal(
    getSocketPort({
      PORT: "8080",
      SOCKET_PORT: "4000",
    }),
    8080,
  );
});

test("falls back to SOCKET_PORT and then port 4000", () => {
  assert.equal(getSocketPort({ SOCKET_PORT: "4100" }), 4100);
  assert.equal(getSocketPort({}), 4000);
});

test("allows localhost in development", () => {
  assert.equal(
    getSocketAllowedOrigin({
      NODE_ENV: "development",
      APP_ORIGIN: "https://example.com",
    }),
    "http://localhost:3000",
  );
});

test("allows only APP_ORIGIN in production", () => {
  assert.equal(
    getSocketAllowedOrigin({
      NODE_ENV: "production",
      APP_ORIGIN: "https://pixel-office.example",
    }),
    "https://pixel-office.example",
  );
});

test("requires APP_ORIGIN in production", () => {
  assert.throws(
    () => getSocketAllowedOrigin({ NODE_ENV: "production" }),
    /APP_ORIGIN/,
  );
});

test("returns the socket service health response for GET /health", () => {
  const response = createResponseRecorder();

  const handled = handleSocketHealthRequest(
    {
      method: "GET",
      url: "/health",
    },
    response,
  );

  assert.equal(handled, true);
  assert.equal(response.statusCode, 200);
  assert.equal(response.headers["content-type"], "application/json");
  assert.deepEqual(JSON.parse(response.body), {
    success: true,
    service: "pixel-office-socket",
  });
});

test("ignores requests outside GET /health", () => {
  const response = createResponseRecorder();

  assert.equal(
    handleSocketHealthRequest(
      {
        method: "POST",
        url: "/health",
      },
      response,
    ),
    false,
  );
  assert.equal(
    handleSocketHealthRequest(
      {
        method: "GET",
        url: "/socket.io/",
      },
      response,
    ),
    false,
  );
  assert.equal(response.body, "");
});

function createResponseRecorder() {
  const headers: Record<string, string> = {};

  return {
    statusCode: 0,
    headers,
    body: "",
    setHeader(name: string, value: string) {
      headers[name.toLowerCase()] = value;
    },
    end(body = "") {
      this.body = body;
    },
  };
}
