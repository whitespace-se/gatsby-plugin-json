# gatsby-plugin-json-v2

Create a json file (or multiple files) for your Gatsby site.

This package is a fork of the original [gatsby-plugin-json](https://github.com/whitespace-se/gatsby-plugin-json#readme) which was not being maintained.

## Install

`npm install gatsby-plugin-json-v2` or `yarn add gatsby-plugin-json-v2`

## How to Use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-json-v2`,
      options: {
        files: [
          {
            output: "/packages.json",
            serialize: ({ matomoPlugin, wordpressPlugin }) => {
              const packages = {};
              matomoPlugin.nodes.forEach(function (node) {
                packages[node.name] = node;
              });
              matomoPlugin.nodes.forEach(function (node) {
                packages[node.name] = node;
              });
              return { packages };
            },
            query: `
          {
            matomoPlugin: allMatomoPlugin(sort: { order: DESC, fields: lastUpdated }) {
              nodes {
                id
                idPath
                type
                versions {
                  download
                  release
                }
              }
            }
            wordpressPlugin: allWordpressPlugin(sort: { order: DESC, fields: lastUpdated }) {
              nodes {
                id
                idPath
                type
                versions {
                  download
                  release
                }
              }
            }
          }
          `,
          },
        ],
      },
    },
  ],
};
```

Each file must include `output` and `query`. Additionally, it is strongly recommended to pass a custom `serialize` function, otherwise an internal serialize function will be used which may not exactly match your particular use case.

_NOTE: This plugin only generates the `json` file(s) when run in `production` mode! To test your feed, run: `gatsby build && gatsby serve`._

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Issues

Continue to file issues in the [original repository](https://github.com/whitespace-se/gatsby-plugin-json/issues) and tag [@justise](https://github.com/justise).

## Acknowledgement

This package is based on [gatsby-plugin-feed](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-feed).

## License

The MIT License

Copyright (c) 2021 Whitespace AB

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

Made by [Whitespace AB](https://whitespace.se/en/) ([@whitespace-se](https://github.com/whitespace-se))
