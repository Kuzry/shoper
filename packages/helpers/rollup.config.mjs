import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: ["src/upstash/server.ts"],
    output: [
      {
        dir: "./dist",
        format: "esm",
        preserveModules: true,
        preserveModulesRoot: "src",
        // entryFileNames: "upstashh/[name].mjs",
      },
    ],
    plugins: [typescript()],
  },
];
