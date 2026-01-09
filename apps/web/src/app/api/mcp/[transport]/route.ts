import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import { createMcpHandler, withMcpAuth } from "mcp-handler";
import { registerProjectTools } from "../tools/projects";

// Force Node.js runtime for Firebase Admin SDK
export const runtime = "nodejs";

const mcpHandler = createMcpHandler(
  (server) => {
    // Register all project tools
    registerProjectTools(server);
  },
  {
    serverInfo: {
      name: "portfolio-mcp-server",
      version: "1.0.0",
    },
    capabilities: {
      tools: {},
    },
  },
  {
    basePath: "/api/mcp",
    maxDuration: 60,
    verboseLogs: process.env.NODE_ENV === "development",
  }
);

// Verify bearer token against MCP_API_KEY
async function verifyToken(
  _req: Request,
  bearerToken?: string
): Promise<AuthInfo | undefined> {
  if (!bearerToken) {
    return undefined;
  }

  const apiKey = process.env.MCP_API_KEY;
  if (!apiKey) {
    console.error("MCP_API_KEY environment variable is not set");
    return undefined;
  }

  if (bearerToken !== apiKey) {
    return undefined;
  }

  return {
    token: bearerToken,
    scopes: ["projects:read", "projects:write"],
    clientId: "mcp-client",
  };
}

// Wrap handler with authentication
const authHandler = withMcpAuth(mcpHandler, verifyToken, {
  required: true,
});

export { authHandler as GET, authHandler as POST, authHandler as DELETE };
