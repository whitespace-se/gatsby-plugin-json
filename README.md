Create a json file (or multiple files) for your Gatsby site. This package is based on [gatsby-plugin-feed](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-feed).

## Install

`npm install gatsby-plugin-json`

## How to Use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-json`,
      options: {
        files: [
          {
            serialize: ({ query: { allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/data.json",
          },
        ],
      },
    },
  ],
}
```

Each file must include `output` and `query`. Additionally, it is strongly recommended to pass a custom `serialize` function, otherwise an internal serialize function will be used which may not exactly match your particular use case.

_NOTE: This plugin only generates the `json` file(s) when run in `production` mode! To test your feed, run: `gatsby build && gatsby serve`._
