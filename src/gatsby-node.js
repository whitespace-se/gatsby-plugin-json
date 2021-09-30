import fs from 'fs-extra';
import path from 'path';

import { defaultOptions, runQuery } from './internals';
import pluginOptionsSchema from './plugin-options';

const publicPath = `./public`;

exports.pluginOptionsSchema = pluginOptionsSchema;

exports.onPostBuild = async ({ graphql, reporter }, pluginOptions) => {
  const options = {
    ...defaultOptions,
    ...pluginOptions,
  };

  const { files } = options;

  for (let file of files) {
    const { output, query, serialize } = file;
    const getData = await runQuery(graphql, query);
    const data = serialize(getData);

    const outputPath = path.join(publicPath, output);
    const outputDir = path.dirname(outputPath);
    if (!(await fs.pathExists(outputDir))) {
      await fs.mkdirp(outputDir);
    }
    await fs.writeFile(outputPath, JSON.stringify(data));
    reporter.success(`Generated JSON file to ${output}`);
  }
};
