import typescript from "rollup-plugin-typescript2";
import preserveDirectives from "rollup-plugin-preserve-directives";

export default [
  {
    input: ["src/upstash/server.ts"],
    output: [
      {
        dir: "./dist",
        format: "esm",
        preserveModules: true,
        entryFileNames: "upstash/[name].mjs",
      },
    ],
    plugins: [typescript(), preserveDirectives()],
  },
];
