import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: [".env.local"] });

export default defineConfig({
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.SUPABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
