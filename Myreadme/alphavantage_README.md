# Alphavantage MCP Server

[![smithery badge](https://smithery.ai/badge/alphavantage)](https://smithery.ai/server/alphavantage)

A MCP server for the stock market data API, Alphavantage API.

## Configuration

### Getting an API Key
1. Sign up for a [Free Alphavantage API key](https://www.alphavantage.co/support/#api-key)
2. Add the API key to your environment variables as `ALPHAVANTAGE_API_KEY`


### Usage with Claude Desktop
Add this to your `claude_desktop_config.json`:

```
{
  "mcpServers": {
    "alphavantage": {
      "command": "uv",
      "args": [
        "--directory",
        "<DIRECTORY>/alphavantage",
        "run",
        "alphavantage"
      ],
      "env": {
        "ALPHAVANTAGE_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

