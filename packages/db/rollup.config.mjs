import typescript from "rollup-plugin-typescript2";
import preserveDirectives from "rollup-plugin-preserve-directives";
import external from "rollup-plugin-peer-deps-external";

export default [
  {
    input: ["src/db.ts", "src/schema.ts"],
    output: [
      {
        dir: "./dist",
        format: "esm",
        preserveModules: true,
        entryFileNames: "[name].mjs",
      },
    ],
    plugins: [typescript(), preserveDirectives(), external()],
    external: ["drizzle-orm", "postgres"],
  },
];
