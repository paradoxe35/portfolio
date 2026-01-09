import { registerProjectTools } from "@/lib/mcp/tools/projects";
import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import { createMcpHandler, withMcpAuth } from "mcp-handler";

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
    instructions: `
Portfolio MCP Server - Manage portfolio projects via MCP.

## Available Tools

### Project Management
- **list_projects** - Get all projects (optionally filter by status)
- **get_project** - Get a single project with full details
- **create_project** - Create a new project (defaults to draft)
- **update_project** - Update project fields
- **delete_project** - Delete a project and its image

### Publishing
- **publish_project** - Make a draft project visible on the portfolio
- **unpublish_project** - Revert a published project back to draft

## Workflow
1. Create a project (saved as draft)
2. Review and edit as needed
3. Call publish_project when ready to go live

## Status Values
- \`draft\` - Not visible on portfolio
- \`published\` - Visible on portfolio
- \`archived\` - Hidden from portfolio
    `.trim(),
  },
  {
    basePath: "/api",
    maxDuration: 60,
    verboseLogs: process.env.NODE_ENV === "development",
    disableSse: true, // Disable SSE (requires Redis)
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
