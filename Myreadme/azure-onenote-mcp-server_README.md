# OneNote MCP Server
[![smithery badge](https://smithery.ai/badge/@modelcontextprotocol/server-onenote)](https://smithery.ai/server/@modelcontextprotocol/server-onenote)

A Model Context Protocol (MCP) server implementation for Microsoft OneNote, enabling AI language models to interact with OneNote through a standardized interface.

## Features

### Notebook Management
- List all notebooks
- Create new notebooks
- Get notebook details
- Delete notebooks

### Section Management
- List sections in a notebook
- Create new sections
- Get section details
- Delete sections

### Page Management
- List pages in a section
- Create new pages with HTML content
- Read page content
- Update page content
- Delete pages
- Search pages across notebooks

## Installation

### Installing via Smithery

To install OneNote Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@modelcontextprotocol/server-onenote):

```bash
npx -y @smithery/cli install @modelcontextprotocol/server-onenote --client claude
```

### Manual Installation
```bash
npm install -g mcp-server-onenote
```

## Configuration

Set the following environment variables:
- `AZURE_TENANT_ID`: Your Azure tenant ID
- `AZURE_CLIENT_ID`: Your Azure application (client) ID
- `AZURE_CLIENT_SECRET`: Your Azure client secret

## Using with MCP Client

Add this to your MCP client configuration (e.g. Claude Desktop):

```json
{
  "mcpServers": {
    "onenote": {
      "command": "npx",
      "args": ["-y", "mcp-server-onenote"],
      "env": {
        "AZURE_TENANT_ID": "<YOUR_TENANT_ID>",
        "AZURE_CLIENT_ID": "<YOUR_CLIENT_ID>",
        "AZURE_CLIENT_SECRET": "<YOUR_CLIENT_SECRET>"
      }
    }
  }
}
```

## Azure App Registration

1. Go to Azure Portal and navigate to App registrations
2. Create a new registration
3. Add Microsoft Graph API permissions:
   - Notes.ReadWrite.All
   - Notes.Read.All
4. Create a client secret
5. Copy the tenant ID, client ID, and client secret for configuration

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Lint
npm run lint
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for information about contributing to this repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
