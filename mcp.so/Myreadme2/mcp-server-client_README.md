# MCP Server-Client Example

This project demonstrates a basic implementation of the Model Context Protocol (MCP) using the TypeScript SDK. It includes both a server and client implementation that communicate over stdio transport.

## Overview

The example includes:
- An MCP server that provides access to resources
- An MCP client that connects to the server and requests resources
- Basic resource listing and reading functionality

## Prerequisites

- Node.js (v16 or higher)
- npm

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Project Structure

```
src/
  ├── index.ts    # Server implementation
  └── client.ts   # Client implementation
```

## Running the Example

You'll need to run the server and client in separate terminal windows.

1. Start the server:
```bash
npm run start:server
```

2. In a new terminal, start the client:
```bash
npm run start:client
```

The client will:
1. Connect to the server
2. Request a list of available resources
3. Read the content of an example resource

## Server Capabilities

The server currently supports:
- Resource listing
- Resource reading
- Basic error handling for unknown resources

## Available Resources

The example server provides access to:
- `file:///example.txt`: A simple text resource

## Development

### Scripts

- `npm run start:server`: Starts the MCP server
- `npm run start:client`: Starts the MCP client

### Adding New Resources

To add new resources, modify the `ListResourcesRequestSchema` handler in `src/index.ts`:

```typescript
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "file:///example.txt",
        name: "Example Resource",
      },
      // Add new resources here
    ],
  };
});
```

## Dependencies

- `@modelcontextprotocol/sdk`: MCP TypeScript SDK
- `ts-node`: TypeScript execution environment
- `typescript`: TypeScript compiler

## License

ISC