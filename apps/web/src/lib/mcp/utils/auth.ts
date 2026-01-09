import { NextRequest, NextResponse } from "next/server";

export function verifyApiKey(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return false;
  }

  const [type, token] = authHeader.split(" ");

  if (type?.toLowerCase() !== "bearer" || !token) {
    return false;
  }

  const apiKey = process.env.MCP_API_KEY;

  if (!apiKey) {
    console.error("MCP_API_KEY environment variable is not set");
    return false;
  }

  return token === apiKey;
}

export function unauthorizedResponse(): NextResponse {
  return NextResponse.json(
    {
      jsonrpc: "2.0",
      error: {
        code: -32001,
        message: "Unauthorized: Invalid or missing API key",
      },
      id: null,
    },
    { status: 401 }
  );
}
