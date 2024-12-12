import { createDb } from "@shoper/db/db";

export const db = createDb(process.env.SUPABASE_URL ?? "");
