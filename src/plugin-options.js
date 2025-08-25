import { parse } from "gatsby/graphql";
import { stripIndent } from "common-tags";

export default ({ Joi }) =>
  Joi.object({
    files: Joi.array().items(
      Joi.object({
        query: Joi.string().required(),
        output: Joi.string().required(),
        serialize: Joi.func().default((data) => data),
      })
        .unknown(true)
        .external(({ query }) => {
          if (query) {
            try {
              parse(query);
            } catch (e) {
              throw new Error(
                stripIndent`
            Invalid plugin options for "gatsby-plugin-json":
            "query" must be a valid GraphQL query. Received the error "${e.message}"`
              );
            }
          }
        })
    ),
  })
    .unknown(true);
