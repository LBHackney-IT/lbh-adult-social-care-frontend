const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["_lambda.js"],
    bundle: true,
    outfile: "./lambda.js",
    platform: "node"
  })
  .catch(() => process.exit(1));
