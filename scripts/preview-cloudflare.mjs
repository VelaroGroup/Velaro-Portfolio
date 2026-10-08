import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const projectRoot = new URL('../', import.meta.url);
const configFile = new URL('wrangler.jsonc', projectRoot);
const previewFile = new URL('.wrangler-preview.jsonc', projectRoot);
const { config, error } = ts.parseConfigFileTextToJson(
  fileURLToPath(configFile), await readFile(configFile, 'utf8'),
);
if (error) throw new Error(ts.flattenDiagnosticMessageText(error.messageText, '\n'));

// Wrangler otherwise rewrites every local request's origin/Host to the first
// production domain. Derive a local config rather than duplicating bindings.
delete config.routes;
delete config.route;
if (config.dev) delete config.dev.host;
await writeFile(previewFile, `${JSON.stringify(config, null, 2)}\n`);

// Keep the generated file beside the original so every relative asset, entry
// and binding path retains its meaning. The official CLI still seeds the cache.
const cli = new URL('node_modules/@opennextjs/cloudflare/dist/cli/index.js', projectRoot);
process.chdir(fileURLToPath(projectRoot));
process.argv = [
  process.execPath, fileURLToPath(cli), 'preview',
  '--config', fileURLToPath(previewFile), ...process.argv.slice(2),
];
await import(cli.href);
