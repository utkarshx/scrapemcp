# Windows-MCP-Server-Installation-Verification-Guide
Windows MCP server setup differs from Mac by requiring absolute file paths and explicit node.exe references instead of npx commands. The installation requires verifying npm and installing packages globally to the AppData\Roaming\npm\node_modules directory. Running servers needs complete paths for both node.exe and the server's index.js file.

README.md file for now, script to come later...

=-=-=-=-=-

This guide assumes you have performed a basic MCP install on Windows 10.  Guide created by Claude Desktop app running MCP servers.

# Comprehensive Windows MCP Server Installation Verification Guide

I'll use sequential thinking to analyze and create a comprehensive guide to the MCP sequential-thinking server.

Based on this analysis, here's a comprehensive guide for verifying MCP server installation on Windows:

## Prerequisites Check
1. Open Command Prompt as administrator
2. Verify npm installation:
   ```cmd
   npm --version
   ```
3. Check npm's global installation directory:
   ```cmd
   npm config get prefix
   ```
   Note: Should point to `C:\Users\<YourUsername>\AppData\Roaming\npm`

## Installation Status Check
1. Check if package is already installed:
   ```cmd
   npm list -g @modelcontextprotocol/server-sequential-thinking
   ```
2. Locate Node.js executable:
   ```cmd
   where node
   ```
   Note: Usually at `C:\Program Files\nodejs\node.exe`

## Package Installation
1. If not installed, run:
   ```cmd
   npm install -g @modelcontextprotocol/server-sequential-thinking
   ```
2. Verify successful installation:
   ```cmd
   npm list -g @modelcontextprotocol/server-sequential-thinking
   ```

## Directory Structure Verification
1. Navigate to npm modules directory:
   ```cmd
   cd %APPDATA%\npm\node_modules\@modelcontextprotocol
   ```
2. Verify folder structure:
   ```cmd
   dir
   cd server-sequential-thinking
   dir
   cd dist
   dir
   ```
   Expected structure:
   - `@modelcontextprotocol\`
     - `server-sequential-thinking\`
       - `dist\`
         - `index.js`

## Execution Test
1. Run server using absolute path:
   ```cmd
   node "%APPDATA%\npm\node_modules\@modelcontextprotocol\server-sequential-thinking\dist\index.js"
   ```
2. Look for success message: "Sequential Thinking MCP Server running on stdio"

## Troubleshooting Guide
1. If `npm config get prefix` shows unexpected location:
   - Reset npm prefix: `npm config set prefix "%APPDATA%\npm"`

2. If `MODULE_NOT_FOUND` error:
   - Verify installation: `npm install -g @modelcontextprotocol/server-sequential-thinking`
   - Check file paths match exactly

3. If node.exe not found:
   - Verify Node.js installation
   - Add to PATH if needed

4. If directory structure is incomplete:
   - Uninstall package: `npm uninstall -g @modelcontextprotocol/server-sequential-thinking`
   - Clear npm cache: `npm cache clean --force`
   - Reinstall package

## Important Windows-Specific Notes
1. Always use double backslashes (\\) in config files
2. Use absolute paths rather than relative paths
3. Remember Windows path length limitations
4. Use `node.exe` path from `where node` command
5. Check permissions if access is denied

This guide ensures a methodical, thorough verification of your MCP server installation on Windows. Follow each step in order, and verify success before moving to the next step.

=-=-=-=-

Key differences between MacOS and Windows 10 for MCP server setup and installation.

Based on this analysis, here's a comprehensive comparison guide between MacOS and Windows 10 for MCP server setup:

# MacOS vs Windows 10: MCP Server Setup Differences

## File System Structure
### MacOS
- Global packages: `/usr/local/lib/node_modules`
- Node executable: `/usr/local/bin/node`
- Config location: `~/Library/Application Support/Claude/`
- Uses forward slashes (/)
- Case-sensitive by default

### Windows 10
- Global packages: `C:\Users\<Username>\AppData\Roaming\npm`
- Node executable: `C:\Program Files\nodejs\node.exe`
- Config location: `%APPDATA%\Claude\`
- Uses backslashes (\\)
- Case-insensitive

## Command Execution
### MacOS
```bash
# Package execution
npx @modelcontextprotocol/server-sequential-thinking

# Global installation
sudo npm install -g @package-name

# Permission setting
chmod +x ./script.sh
```

### Windows 10
```cmd
# Package execution
node "C:\Users\Username\AppData\Roaming\npm\node_modules\@package-name\dist\index.js"

# Global installation (as Administrator)
npm install -g @package-name

# Permission setting
# Run CMD as Administrator
```

## Configuration File Format
### MacOS
```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sequential-thinking"
      ]
    }
  }
}
```

### Windows 10
```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "C:\\Program Files\\nodejs\\node.exe",
      "args": [
        "C:\\Users\\Username\\AppData\\Roaming\\npm\\node_modules\\@modelcontextprotocol\\server-sequential-thinking\\dist\\index.js"
      ]
    }
  }
}
```

## Key Differences Summary
1. **Path Handling**
   - MacOS: Uses PATH resolution and relative paths
   - Windows: Requires absolute paths and explicit node.exe reference

2. **Package Management**
   - MacOS: Uses npx for execution
   - Windows: Requires direct node execution

3. **Permissions**
   - MacOS: Uses sudo and chmod
   - Windows: Uses Administrator privileges

4. **Environment Variables**
   - MacOS: `$HOME`, `$PATH` with colon separators
   - Windows: `%USERPROFILE%`, `%PATH%` with semicolon separators

5. **Configuration Requirements**
   - MacOS: Simpler, relies on npm/npx
   - Windows: More verbose, requires full paths

## Converting Between Platforms
1. **Path Conversion**
   - MacOS to Windows: Replace `/` with `\\`
   - Add drive letter (e.g., `C:`) at start
   - Replace `/usr/local` with appropriate Windows paths

2. **Command Conversion**
   - Replace `npx` commands with direct `node.exe` execution
   - Convert environment variables to Windows format
   - Remove Unix-specific permissions commands

3. **Configuration Conversion**
   - Replace npx commands with full Windows paths
   - Remove `-y` flag for Windows
   - Add complete path to node.exe
   - Use double backslashes in paths

## Common Issues and Solutions
1. **Windows Specific**
   - Path length limitations
   - Permission issues with AppData
   - Backslash escaping in JSON
   - CMD vs PowerShell syntax differences

2. **Conversion Pitfalls**
   - Missing path separators
   - Incorrect node.exe reference
   - Incomplete path conversions
   - Permission model mismatches

