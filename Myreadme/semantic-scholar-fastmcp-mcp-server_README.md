# Semantic Scholar MCP Server

[![smithery badge](https://smithery.ai/badge/semantic-scholar-fastmcp-mcp-server)](https://smithery.ai/server/semantic-scholar-fastmcp-mcp-server)

A FastMCP server implementation for the Semantic Scholar API, providing comprehensive access to academic paper data, author information, and citation networks.

## Features

- **Paper Search & Discovery**

  - Full-text search with advanced filtering
  - Title-based paper matching
  - Paper recommendations (single and multi-paper)
  - Batch paper details retrieval
  - Advanced search with ranking strategies

- **Citation Analysis**

  - Citation network exploration
  - Reference tracking
  - Citation context and influence analysis

- **Author Information**

  - Author search and profile details
  - Publication history
  - Batch author details retrieval

- **Advanced Features**
  - Complex search with multiple ranking strategies
  - Customizable field selection
  - Efficient batch operations
  - Rate limiting compliance
  - Support for both authenticated and unauthenticated access
  - Graceful shutdown and error handling
  - Connection pooling and resource management

## System Requirements

- Python 3.8+
- FastMCP framework
- Environment variable for API key (optional)

## Installation

### Installing via Smithery

To install Semantic Scholar MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/semantic-scholar-fastmcp-mcp-server):

```bash
npx -y @smithery/cli install semantic-scholar-fastmcp-mcp-server --client claude
```

Install using FastMCP:

```bash
fastmcp install semantic-scholar-server.py --name "Semantic Scholar" -e SEMANTIC_SCHOLAR_API_KEY=your-api-key
```

The `-e SEMANTIC_SCHOLAR_API_KEY` parameter is optional. If not provided, the server will use unauthenticated access with lower rate limits.

## Configuration

### Environment Variables

- `SEMANTIC_SCHOLAR_API_KEY`: Your Semantic Scholar API key (optional)
  - Get your key from [Semantic Scholar API](https://www.semanticscholar.org/product/api)
  - If not provided, the server will use unauthenticated access

### Rate Limits

The server automatically adjusts to the appropriate rate limits:

**With API Key**:

- Search, batch and recommendation endpoints: 1 request per second
- Other endpoints: 10 requests per second

**Without API Key**:

- All endpoints: 100 requests per 5 minutes
- Longer timeouts for requests

## Available MCP Tools

> Note: All tools are aligned with the official [Semantic Scholar API documentation](https://api.semanticscholar.org/api-docs/). Please refer to the official documentation for detailed field specifications and the latest updates.

### Paper Search Tools

- `paper_relevance_search`: Search for papers using relevance ranking

  - Supports comprehensive query parameters including year range and citation count filters
  - Returns paginated results with customizable fields

- `paper_bulk_search`: Bulk paper search with sorting options

  - Similar to relevance search but optimized for larger result sets
  - Supports sorting by citation count, publication date, etc.

- `paper_title_search`: Find papers by exact title match

  - Useful for finding specific papers when you know the title
  - Returns detailed paper information with customizable fields

- `paper_details`: Get comprehensive details about a specific paper

  - Accepts various paper ID formats (S2 ID, DOI, ArXiv, etc.)
  - Returns detailed paper metadata with nested field support

- `paper_batch_details`: Efficiently retrieve details for multiple papers
  - Accepts up to 1000 paper IDs per request
  - Supports the same ID formats and fields as single paper details

### Citation Tools

- `paper_citations`: Get papers that cite a specific paper

  - Returns paginated list of citing papers
  - Includes citation context when available
  - Supports field customization and sorting

- `paper_references`: Get papers referenced by a specific paper
  - Returns paginated list of referenced papers
  - Includes reference context when available
  - Supports field customization and sorting

### Author Tools

- `author_search`: Search for authors by name

  - Returns paginated results with customizable fields
  - Includes affiliations and publication counts

- `author_details`: Get detailed information about an author

  - Returns comprehensive author metadata
  - Includes metrics like h-index and citation counts

- `author_papers`: Get papers written by an author

  - Returns paginated list of author's publications
  - Supports field customization and sorting

- `author_batch_details`: Get details for multiple authors
  - Efficiently retrieve information for up to 1000 authors
  - Returns the same fields as single author details

### Recommendation Tools

- `paper_recommendations_single`: Get recommendations based on a single paper

  - Returns similar papers based on content and citation patterns
  - Supports field customization for recommended papers

- `paper_recommendations_multi`: Get recommendations based on multiple papers
  - Accepts positive and negative example papers
  - Returns papers similar to positive examples and dissimilar to negative ones

## Usage Examples

### Basic Paper Search

```python
results = await paper_relevance_search(
    context,
    query="machine learning",
    year="2020-2024",
    min_citation_count=50,
    fields=["title", "abstract", "authors"]
)
```

### Paper Recommendations

```python
# Single paper recommendation
recommendations = await paper_recommendations_single(
    context,
    paper_id="649def34f8be52c8b66281af98ae884c09aef38b",
    fields="title,authors,year"
)

# Multi-paper recommendation
recommendations = await paper_recommendations_multi(
    context,
    positive_paper_ids=["649def34f8be52c8b66281af98ae884c09aef38b", "ARXIV:2106.15928"],
    negative_paper_ids=["ArXiv:1805.02262"],
    fields="title,abstract,authors"
)
```

### Batch Operations

```python
# Get details for multiple papers
papers = await paper_batch_details(
    context,
    paper_ids=["649def34f8be52c8b66281af98ae884c09aef38b", "ARXIV:2106.15928"],
    fields="title,authors,year,citations"
)

# Get details for multiple authors
authors = await author_batch_details(
    context,
    author_ids=["1741101", "1780531"],
    fields="name,hIndex,citationCount,paperCount"
)
```

## Error Handling

The server provides standardized error responses:

```python
{
    "error": {
        "type": "error_type",  # rate_limit, api_error, validation, timeout
        "message": "Error description",
        "details": {
            # Additional context
            "authenticated": true/false  # Indicates if request was authenticated
        }
    }
}
```
