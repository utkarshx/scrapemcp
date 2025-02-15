# Building a Twitter Trends Analysis MCP Server for Claude

This tutorial will guide you through creating a Model Context Protocol (MCP) server that connects Twitter's trending topics with Claude's analysis capabilities. The server will fetch real-time Twitter trends and use Claude to analyze them for business opportunities.

## Prerequisites

- Python 3.8 or higher
- Claude Desktop installed
- Twitter Developer Account with API access
- Basic understanding of Python

## Part 1: Setting Up the Environment

1. Create a new project directory:
```bash
mkdir twitter-trends-mcp
cd twitter-trends-mcp
```

2. Set up a virtual environment:
```bash
python -m venv .venv
.venv\Scripts\activate  # On Windows
```

3. Install required packages:
```bash
pip install tweepy mcp python-dotenv hatchling
```

## Part 2: Project Structure

Create the following directory structure:
```
twitter-trends-mcp/
├── pyproject.toml
├── twitter_server_run.py
├── src/
│   └── twitter_trends_mcp/
│       ├── __init__.py
│       └── server.py
```

## Part 3: Configuration Files

1. Create `pyproject.toml` in the root directory:
```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "twitter-trends-mcp"
version = "0.1.0"
description = "Twitter Trends MCP Server"
requires-python = ">=3.8"
dependencies = [
    "tweepy",
    "mcp",
    "python-dotenv"
]

[tool.hatch.build]
packages = ["src/twitter_trends_mcp"]
include = ["src/twitter_trends_mcp/*"]

[project.scripts]
twitter-trends-server = "twitter_trends_mcp:main"
```

2. Create `src/twitter_trends_mcp/__init__.py`:
```python
"""Twitter Trends MCP Server package."""
import asyncio
from . import server

def main():
    """Main entry point for the package."""
    asyncio.run(server.main())

__all__ = ['main', 'server']
```

3. Create entry point file `twitter_server_run.py`:
```python
#!/usr/bin/env python
import os
import sys
import logging
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('twitter_server.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger('twitter-trends-mcp')

# Add the src directory to the Python path
src_path = str(Path(__file__).parent / "src")
sys.path.insert(0, src_path)
logger.info(f"Python path: {sys.path}")

try:
    from twitter_trends_mcp.server import main
    logger.info("Successfully imported server module")
except Exception as e:
    logger.error(f"Error importing server module: {e}")
    raise

if __name__ == "__main__":
    try:
        logger.info("Starting server...")
        import asyncio
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Server stopped by user")
    except Exception as e:
        logger.error(f"Server error: {e}")
        raise
```

## Part 4: Twitter API Setup

1. Go to [Twitter Developer Portal](https://developer.twitter.com)
2. Create a new project and app
3. Get your API credentials:
   - API Key
   - API Secret
   - Access Token
   - Access Token Secret
   - Bearer Token

## Part 5: MCP Server Implementation

Create `src/twitter_trends_mcp/server.py` with the complete server code, including:
- API client initialization
- Trend fetching logic
- Resource and tool handlers
- Analysis integration with Claude

Key components:
```python
# Initialize Twitter clients
client_v2 = tweepy.Client(...)
auth = tweepy.OAuthHandler(...)
api_v1 = tweepy.API(auth)

# Define server capabilities
app = Server("twitter-trends-server")

# Implement handlers
@app.list_resources()
async def list_resources() -> list[Resource]: ...

@app.read_resource()
async def read_resource(uri: AnyUrl) -> str: ...

@app.list_tools()
async def list_tools() -> list[Tool]: ...

@app.call_tool()
async def call_tool(name: str, arguments: Any) -> Sequence[TextContent]: ...
```

## Part 6: Claude Desktop Configuration

1. Locate your Claude Desktop config file:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. Update the configuration:
```json
{
  "mcpServers": {
    "twitter-trends": {
      "command": "C:\\Users\\YOUR_USERNAME\\twitter-trends-mcp\\.venv\\Scripts\\python.exe",
      "args": ["C:\\Users\\YOUR_USERNAME\\twitter-trends-mcp\\twitter_server_run.py"],
      "env": {
        "PYTHONPATH": "C:\\Users\\YOUR_USERNAME\\twitter-trends-mcp\\src",
        "PYTHONUNBUFFERED": "1"
      },
      "cwd": "C:\\Users\\YOUR_USERNAME\\twitter-trends-mcp"
    }
  }
}
```

## Part 7: Running and Testing

1. Install the package:
```bash
pip install -e .
```

2. Run server:
```bash
python twitter_server_run.py
```

3. In Claude Desktop:
   - Click the 🔌 icon
   - Look for "twitter-trends"
   - Try: "Analyze current Twitter trends for SaaS opportunities"

4. Monitor logs:
```bash
Get-Content twitter_server.log -Wait
```

## Troubleshooting Tips

1. Common Issues:
   - Module not found: Check PYTHONPATH
   - Connection errors: Verify paths in config
   - API errors: Validate credentials
   - Server not responding: Check logs

2. Log Locations:
   - Server: `twitter_server.log`
   - Claude: `%APPDATA%\Claude\Logs\mcp*.log`

## Features

- Real-time trend fetching
- Category-based analysis
- Business opportunity identification
- AI-powered insights
- Detailed logging

## Best Practices

1. Use absolute paths
2. Keep credentials secure
3. Monitor logs
4. Test incrementally
5. Use virtual environments

## Next Steps

- Add trend history
- Implement sentiment analysis
- Support more regions
- Add business metrics
- Enhance analysis categories
