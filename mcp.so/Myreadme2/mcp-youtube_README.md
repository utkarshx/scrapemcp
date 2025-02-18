# YouTube MCP Server

Uses `yt-dlp` to download subtitles from YouTube and connects it to claude.ai via [Model Context Protocol](https://modelcontextprotocol.io/introduction). Try it by asking Claude, "Summarize the YouTube video <<URL>>". Requires `yt-dlp` to be installed locally e.g. via Homebrew.

### How do I get this working?

1. Install `yt-dlp` (Homebrew and WinGet both work great here)
1. Now, install this via [mcp-installer](https://github.com/anaisbetts/mcp-installer), use the name `@anaisbetts/mcp-youtube`