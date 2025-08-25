# gatsby-plugin-json

A Gatsby plugin for generating JSON files from GraphQL queries during the build process. Perfect for creating API endpoints, search indexes, or exporting data for external consumption.

## Features

- **Multiple files**: Generate multiple JSON files from different GraphQL queries
- **Custom serialization**: Transform your data with custom serialize functions  
- **Production optimized**: Only generates files during production builds
- **Gatsby v5 compatible**: Updated for the latest Gatsby version

## Install

```bash
npm install gatsby-plugin-json
```

or

```bash
yarn add gatsby-plugin-json
```

## Quick Start

Add the plugin to your `gatsby-config.js`:

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-json`,
      options: {
        files: [
          {
            output: "/blog-posts.json",
            query: `
              {
                allMarkdownRemark(
                  sort: {
                    frontmatter: {
                      date: DESC
                    }
                  }
                ) {
                  edges {
                    node {
                      frontmatter {
                        title
                        date
                        slug
                      }
                      excerpt
                    }
                  }
                }
              }
            `,
            serialize: (data) => {
              return data.allMarkdownRemark.edges.map(({ node }) => ({
                title: node.frontmatter.title,
                date: node.frontmatter.date,
                slug: node.frontmatter.slug,
                excerpt: node.excerpt,
              }))
            },
          },
        ],
      },
    },
  ],
}
```

## Configuration

Each file object in the `files` array supports the following options:

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `output` | `string` | Yes | Output path for the JSON file (relative to `/public`) |
| `query` | `string` | Yes | GraphQL query to fetch data |
| `serialize` | `function` | No | Function to transform the query result |

### Custom Serialization

The `serialize` function receives the raw GraphQL query result and should return the data structure you want in your JSON file:

```javascript
serialize: (data) => {
  // Transform your data here
  return {
    posts: data.allMarkdownRemark.edges,
    totalCount: data.allMarkdownRemark.totalCount,
    lastUpdated: new Date().toISOString(),
  }
}
```

If no `serialize` function is provided, the plugin will output the raw GraphQL result.

## Important Notes

- **Production only**: Files are only generated during production builds (`gatsby build`)
- **GraphQL syntax**: Uses Gatsby v5+ GraphQL syntax (nested sort objects)
- **File location**: Generated files are placed in the `/public` directory

To test your JSON generation locally:

```bash
gatsby build && gatsby serve
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Acknowledgement
This package is based on [gatsby-plugin-feed](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-feed).

## License

The MIT License

Copyright (c) 2021-2025 Whitespace AB

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## About Whitespace

This plugin is developed and maintained by [Whitespace AB](https://whitespace.se/en/), a Swedish digital agency specializing in web development, design, and digital solutions.

---

Made by [Whitespace AB](https://whitespace.se/en/) ([@whitespace-se](https://github.com/whitespace-se))
