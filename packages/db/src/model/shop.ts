import { TDb } from "../db";
import * as schema from "../schema";
import { eq } from "drizzle-orm";

export const selectShopByShopId = (db: TDb, shopId: string) => {
  return db
    .select()
    .from(schema.accessTokens)
    .where(eq(schema.accessTokens.shop_id, shopId));
};
