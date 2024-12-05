import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export const createDb = (connectionString: string) => {
  return drizzle(postgres(connectionString, { prepare: false }), { schema });
};
