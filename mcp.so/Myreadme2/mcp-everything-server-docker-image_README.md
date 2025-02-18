
# Docker image for the MCP Everything server with SSE transport

MCP Everything server source code: https://github.com/modelcontextprotocol/servers/tree/main/src/everything

Image name: `tzolov/mcp-everything-server:v1`


## Create a multi-architecture image supporting both arm64 and amd64.

### Enable Docker Buildx

Buildx is an experimental Docker CLI feature for building multi-architecture images. It’s included by default in modern Docker versions.

#### Verify Buildx is installed:

```bash
docker buildx version
```

If not installed, update Docker or enable experimental features in your Docker config file.

#### Create a new builder instance:

```bash
docker buildx create --use --name multiarch-builder
docker buildx inspect --bootstrap
```

This sets up a Buildx builder that supports multi-architecture builds.

### Build and Push Multi-Architecture Image
Use the following steps to build and push the image to Docker Hub:

#### Log in to Docker Hub (if not already logged in):
```bash
docker login
```

#### Build and push the image for multiple platforms: 

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t tzolov/mcp-everything-server:v1 --push .
```
This command: (1) Builds the image for amd64 and arm64; (2) Pushes the multi-architecture manifest to Docker Hub

### Verify the Multi-Architecture Image

After pushing, confirm that the image supports multiple architectures:

Inspect the image manifest:

```bash
docker manifest inspect tzolov/mcp-everything-server:v1
```
Look for entries under manifests showing arm64 and amd64.


## Run the image 

```
docker run -p 3001:3001 --rm -it tzolov/mcp-everything-server:v1
```

## Debug 

Run the image using the bash entry point

```
docker run -p 3001:3001 --rm -it --entrypoint bash tzolov/mcp-everything-server:v1
```