import typescript from "rollup-plugin-typescript2";
import preserveDirectives from "rollup-plugin-preserve-directives";
import external from "rollup-plugin-peer-deps-external";

export default [
  {
    input: [
      "src/upstash/index.ts",
      "src/shoper/index.ts",
      "src/shoper/schemas.ts",
      "src/shoper/types.ts",
    ],
    output: [
      {
        dir: "./dist",
        format: "esm",
        preserveModules: true,
        entryFileNames: "[name].mjs",
      },
    ],
    plugins: [typescript(), preserveDirectives(), external()],
    external: ["server-only", "@upstash/qstash"],
  },
];
