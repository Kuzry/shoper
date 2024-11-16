import typescript from "rollup-plugin-typescript2";
import preserveDirectives from "rollup-plugin-preserve-directives";
import external from "rollup-plugin-peer-deps-external";

export default [
  {
    input: ["src/upstash/server.ts"],
    output: [
      {
        dir: "./dist",
        format: "esm",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    ],
    plugins: [typescript(), preserveDirectives(), external()],
  },
];
