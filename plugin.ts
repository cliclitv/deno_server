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

const filename =
  `https://github.com/cliclitv/deno_server/releases/download/plugin@v0.0.1/${filenamePrefix}${filenameBase}${filenameSuffix}`;

const plugin = Deno.openPlugin(filename);

export default plugin.ops;
