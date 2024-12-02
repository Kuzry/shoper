import { createRouteHandlersForAction } from "zsa-openapi";
import { createServerActionProcedure } from "zsa";
import { db } from "@shoper/db/db";
import { accessTokens, shops } from "@shoper/db/schema";
import {
  applicationInstallMessageSchema,
  applicationUninstallMessageSchema,
  type TAllApplicationMessages,
} from "@shoper/types/shoper";
import { eq } from "drizzle-orm";

const isUpstashProcedure = createServerActionProcedure().handler(async () => {
  // await verifyQStashSignature(
  //   (await request?.clone()?.text()) ?? "",
  //   request?.headers.get("upstash-signature") ?? ""
  // );

  return {};
});

const isShoperProcedure = createServerActionProcedure(
  isUpstashProcedure
).handler(async ({ request }) => {
  const body = await request?.clone()?.text();
  const urlSearchParamsBody = new URLSearchParams(body);
  const newBodyArray: string[] = [];

  urlSearchParamsBody.forEach(
    (value, key) => key !== "hash" && newBodyArray.push(`${key}=${value}`)
  );

  // verifyShoperSignature(
  //   newBodyArray.join("&"),
  //   urlSearchParamsBody.get("hash") ?? ""
  // );

  return {};
});

export const { POST } = createRouteHandlersForAction(
  isShoperProcedure
    .createServerAction()
    .input(async ({ request }) => {
      const body = Object.fromEntries(
        new URLSearchParams(await request?.clone()?.text())
      ) as TAllApplicationMessages;

      if (body.action === "install") {
        return applicationInstallMessageSchema;
      } else if (body.action === "uninstall") {
        return applicationUninstallMessageSchema;
      }

      throw Error("Incorrect request");
    })
    .handler(async ({ input }) => {
      if (input.action === "install") {
        const shopRow = {
          id: input.shop,
          url: input.shop_url,
          app_version: input.application_version,
          app_installed: true,
          auth_code: input.auth_code,
        };

        await db.insert(shops).values(shopRow).onConflictDoUpdate({
          target: shops.id,
          set: shopRow,
        });

        const shoperTokensResponse = await fetch(
          `${input.shop_url}/webapi/rest/oauth/token`,
          {
            method: "POST",
            body: new URLSearchParams({
              code: shopRow.auth_code,
              grant_type: "authorization_code",
            }).toString(),
            headers: {
              Authorization: `Basic ${Buffer.from(`${process.env.SHOPER_APP_ID}:${process.env.SHOPER_APP_SECRET}`).toString("base64")}`,
              "Accept-Language": "pl_PL;q=0.8",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const shoperTokensBody = await shoperTokensResponse.json();

        // eslint-disable-next-line no-console
        console.log("______shoperTokensBody______");
        // eslint-disable-next-line no-console
        console.log(shoperTokensBody);

        const accessTokenRow = {
          shop_id: input.shop,
          access_token: shoperTokensBody.access_token as string,
          refresh_token: shoperTokensBody.refresh_token as string,
          expires_at: new Date(),
        };

        await db
          .insert(accessTokens)
          .values(accessTokenRow)
          .onConflictDoUpdate({
            target: shops.id,
            set: accessTokenRow,
          });
      } else if (input.action === "uninstall") {
        await db
          .update(shops)
          .set({
            app_installed: false,
          })
          .where(eq(shops.id, input.shop));
      }

      // console.log(await db.select().from(shops));
      return {
        pingu: "pongu123321!",
      };
    }),
  {
    contentTypes: ["application/x-www-form-urlencoded"],
  }
);
