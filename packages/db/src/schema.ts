import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const shops = pgTable("shops", {
  id: varchar().primaryKey(),
  url: varchar().notNull(),
  app_version: varchar().notNull(),
  app_installed: boolean().notNull(),
  auth_code: varchar().notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const accessTokens = pgTable(
  "access_tokens",
  {
    id: uuid().primaryKey().defaultRandom(),
    shop_id: varchar()
      .notNull()
      .references(() => shops.id),
    access_token: varchar().notNull(),
    refresh_token: varchar().notNull(),
    expires_at: timestamp().notNull(),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => ({
    accessTokenShopIdUniqueIndex: uniqueIndex(
      "access_token_shop_id_unique_index"
    ).on(table.shop_id),
  })
);

export const billings = pgTable(
  "billings",
  {
    id: uuid().primaryKey().defaultRandom(),
    shop_id: varchar()
      .notNull()
      .references(() => shops.id),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => ({
    accessTokenShopIdUniqueIndex: uniqueIndex(
      "billings_shop_id_unique_index"
    ).on(table.shop_id),
  })
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid().primaryKey().defaultRandom(),
    shop_id: varchar()
      .notNull()
      .references(() => shops.id),
    expires_at: timestamp().notNull(),
  },
  (table) => ({
    accessTokenShopIdUniqueIndex: uniqueIndex(
      "subscriptions_shop_id_unique_index"
    ).on(table.shop_id),
  })
);
