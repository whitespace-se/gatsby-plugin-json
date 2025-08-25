export const runQuery = (handler, query) =>
  handler(query).then((r) => {
    if (r.errors) {
      throw new Error(r.errors.join(`, `));
    }
    return r.data;
  });

export const defaultOptions = {
  files: [
    {
      query: `
      {
        allMarkdownRemark(
          limit: 1000,
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
              }
            }
          }
        }
      }
      `,
      output: `packages.json`,
    },
  ],
};
