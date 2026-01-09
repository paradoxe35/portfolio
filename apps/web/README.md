# Portfolio Web App

A modern portfolio website built with Next.js 15, React 19, and Tailwind CSS v4. Features a headless CMS powered by Firebase and an MCP (Model Context Protocol) server for AI-assisted content management.

## Getting Started

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Required variables:

| Variable                  | Description                              |
| ------------------------- | ---------------------------------------- |
| `FIREBASE_PROJECT_ID`     | Firebase project ID                      |
| `FIREBASE_CLIENT_EMAIL`   | Firebase service account email           |
| `FIREBASE_PRIVATE_KEY`    | Firebase service account private key     |
| `FIREBASE_STORAGE_BUCKET` | Firebase storage bucket name             |
| `MCP_API_KEY`             | Secret key for MCP server authentication |

## MCP Server

The portfolio includes an MCP server for managing projects via AI assistants (Claude Desktop, Cursor, etc.).

### Endpoints

| Transport       | URL        | Description                                |
| --------------- | ---------- | ------------------------------------------ |
| Streamable HTTP | `/api/mcp` | Modern transport (recommended)             |
| SSE             | `/api/sse` | Legacy transport (backwards compatibility) |

### Available Tools

#### Project Management

- **list_projects** - Get all projects (optionally filter by status)
- **get_project** - Get a single project with full details
- **create_project** - Create a new project (defaults to draft)
- **update_project** - Update project fields
- **delete_project** - Delete a project and its image

#### Publishing

- **publish_project** - Make a draft project visible on the portfolio
- **unpublish_project** - Revert a published project back to draft

### Project Workflow

1. **Create** - Projects are saved as `draft` by default
2. **Edit** - Update content, images, technologies as needed
3. **Publish** - Call `publish_project` when ready to go live
4. **Unpublish** - Revert to draft if changes are needed

### Status Values

| Status      | Description              |
| ----------- | ------------------------ |
| `draft`     | Not visible on portfolio |
| `published` | Visible on portfolio     |
| `archived`  | Hidden from portfolio    |

### Client Configuration

Add to your MCP client config (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "portfolio": {
      "url": "https://your-domain.com/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_MCP_API_KEY"
      }
    }
  }
}
```

### Authentication

The MCP server uses Bearer token authentication. Set `MCP_API_KEY` in your environment and include it in the `Authorization` header.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS v4
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **MCP**: @modelcontextprotocol/sdk, mcp-handler

## Project Structure

```
apps/web/
├── src/
│   ├── app/
│   │   ├── api/mcp/        # MCP server endpoints
│   │   ├── works/          # Portfolio pages
│   │   └── contact/        # Contact page
│   ├── components/         # React components
│   └── lib/                # Utilities and Firebase config
├── public/                 # Static assets
└── .env.local              # Environment variables
```

## Deployment

Deploy to Vercel or any platform supporting Next.js:

```bash
pnpm build
```

Ensure all environment variables are configured in your deployment platform.
