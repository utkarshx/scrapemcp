# TMDB MCP Server

This MCP server integrates with The Movie Database (TMDB) API to provide movie information, search capabilities, and recommendations.

<a href="https://glama.ai/mcp/servers/g3nl1a0n25"><img width="380" height="200" src="https://glama.ai/mcp/servers/g3nl1a0n25/badge" alt="mcp-server-tmdb MCP server" /></a>

# Prerequisites

Before installing and running the TMDB MCP server, ensure you have the following prerequisites installed and configured:

## Required Software

- **Node.js**
  - Version 18.0.0 or higher
  - Download from [Node.js official website](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm (Node Package Manager)**
  - Version 8.0.0 or higher (comes with Node.js)
  - Verify installation: `npm --version`

- **TypeScript**
  - Will be installed as a project dependency
  - Can be installed globally: `npm install -g typescript`
  - Verify installation: `tsc --version`

## Required Accounts & API Keys

- **TMDB Account**
  - Free account at [TMDB](https://www.themoviedb.org/)
  - API key from TMDB dashboard
  - API access must be approved by TMDB

- **Claude Desktop Application**
  - Latest version installed
  - Access to modify configuration files

## System Requirements

- **Operating Systems**
  - macOS (10.15 or later)
  - Linux (modern distributions)

- **Hardware Requirements**
  - Minimum 4GB RAM
  - 1GB free disk space
  - Stable internet connection

## Development Environment

For the best development experience, we recommend:
- A code editor with TypeScript support (e.g., VS Code)
- Terminal access
- Git (for version control)

## Features

### Tools

- **search_movies**
  - Search for movies by title or keywords
  - Input: `query` (string): Search query
  - Returns: List of movies with titles, release years, IDs, ratings, and overviews
  - Example: Search for movies about space exploration

- **get_recommendations**
  - Get movie recommendations based on a movie ID
  - Input: `movieId` (string): TMDB movie ID
  - Returns: Top 5 recommended movies with details
  - Example: Get recommendations based on movie ID 550 (Fight Club)

- **get_trending**
  - Get trending movies for a specified time window
  - Input: `timeWindow` (string): Either "day" or "week"
  - Returns: Top 10 trending movies with details
  - Example: Get today's trending movies

### Resources

The server provides access to TMDB movie information:

- **Movies** (`tmdb:///movie/<movie_id>`)
  - Comprehensive movie details including:
    - Title and release date
    - Rating and overview
    - Genres
    - Poster URL
    - Cast information (top 5 actors)
    - Director
    - Selected reviews
  - All data is returned in JSON format

  ## Getting Started

1. Get a TMDB API key:
   - Sign up at [TMDB](https://www.themoviedb.org/)
   - Go to your account settings
   - Navigate to the API section
   - Request an API key for developer use

2. Clone and set up the project:
   ```bash
   git clone [repository-url]
   cd mcp-server-tmdb
   npm install
   ```

3. Build the server:
   ```bash
   npm run build
   ```

4. Set up your environment variable:
   ```bash
   export TMDB_API_KEY=your_api_key_here
   ```

### Usage with Claude Desktop

To integrate this server with Claude Desktop, add the following to your app's server configuration file (located at `~/Library/Application Support/Claude/config.json`):

```json
{
  "mcpServers": {
    "tmdb": {
      "command": "/full/path/to/dist/index.js",
      "env": {
        "TMDB_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Replace `/full/path/to` with the actual path to your project directory.

## Example Usage

Once the server is running with Claude Desktop, you can use commands like:

1. Search for movies:
   ```
   "Search for movies about artificial intelligence"
   ```

2. Get trending movies:
   ```
   "What are the trending movies today?"
   "Show me this week's trending movies"
   ```

3. Get movie recommendations:
   ```
   "Get movie recommendations based on movie ID 550"
   ```

4. Get movie details:
   ```
   "Tell me about the movie with ID 550"
   ```

## Error Handling

The server includes comprehensive error handling for:
- Invalid API keys
- Network errors
- Invalid movie IDs
- Malformed requests

Error messages will be returned in a user-friendly format through Claude Desktop.

## Development

To watch for changes during development:
```bash
npm run watch
```

## License

This MCP server is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
