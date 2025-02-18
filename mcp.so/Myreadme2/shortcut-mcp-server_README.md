# Shortcut MCP Server

A Message Control Protocol server implementation for Shortcut project management integration.

## Overview

This project implements a Message Control Protocol (MCP) server that integrates with Shortcut (formerly Clubhouse) project management platform. It enables seamless communication and control of Shortcut features through a standardized messaging protocol.

## Features

- MCP protocol implementation
- Shortcut API integration
- Message routing and handling
- Secure communication

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Shortcut API token

### Installation

```bash
git clone https://github.com/davidteren/shortcut-mcp-server.git
cd shortcut-mcp-server
npm install
```

### Configuration

Create a `.env` file in the root directory with your Shortcut API token:

```env
SHORTCUT_API_TOKEN=your_api_token_here
MCP_SERVER_PORT=3000
```

## Development

```bash
npm run dev  # Start development server
npm test     # Run tests
npm build    # Build for production
```

## License

MIT