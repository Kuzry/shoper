import { createRouteHandlersForAction } from "zsa-openapi";
import { createServerActionProcedure } from "zsa";
import { z } from "zod";
import { verifyQStashSignature } from "@shoper/helpers/upstash/server";
import { verifyShoperSignature } from "@shoper/helpers/shoper/server";

const isUpstashProcedure = createServerActionProcedure().handler(
  async ({ request }) => {
    await verifyQStashSignature(
      (await request?.clone()?.text()) ?? "",
      request?.headers.get("upstash-signature") ?? ""
    );

    return {};
  }
);

const isShoperProcedure = createServerActionProcedure(
  isUpstashProcedure
).handler(async ({ request }) => {
  const body = await request?.clone()?.text();
  const urlSearchParamsBody = new URLSearchParams(body);
  const newBodyArray: string[] = [];

  urlSearchParamsBody.forEach(
    (value, key) => key !== "hash" && newBodyArray.push(`${key}=${value}`)
  );

  verifyShoperSignature(
    newBodyArray.join("&"),
    urlSearchParamsBody.get("hash") ?? ""
  );

  return {};
});

export const { POST } = createRouteHandlersForAction(
  isShoperProcedure
    .createServerAction()
    .input(z.object({}))
    .handler(async () => {
      return {
        pingu: "pongu123321!",
      };
    }),
  {
    contentTypes: ["application/x-www-form-urlencoded"],
  }
);
