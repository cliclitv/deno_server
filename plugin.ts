import { exists } from "fs/mod.ts";
const { openPlugin, writeFile } = Deno;

const filenameBase = "deno_server_plugin";

let filenameSuffix = ".so";
let filenamePrefix = "lib";

if (Deno.build.os === "win") {
  filenameSuffix = ".dll";
  filenamePrefix = "";
}
if (Deno.build.os === "mac") {
  filenameSuffix = ".dylib";
}

const filename = `${filenamePrefix}${filenameBase}${filenameSuffix}`;

if (!(await exists(filename))) {
  const b = await fetch(
    `https://github.com/cliclitv/deno_server/releases/download/plugin@v0.0.1/${filename}`
  );
  await writeFile(filename, new Uint8Array(await b.arrayBuffer()));
}

const plugin = openPlugin(filename);

export default plugin.ops;
