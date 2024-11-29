import { createRouteHandlersForAction } from "zsa-openapi";
import { createServerActionProcedure } from "zsa";
import { z } from "zod";
import { upstashQStashReciver } from "@shoper/helpers/upstash/server";

const isUpstashProcedure = createServerActionProcedure()
  .input(z.object({}))
  .handler(async ({ request }) => {
    // eslint-disable-next-line no-console
    console.log("process.env.QSTASH_CURRENT_SIGNING_KEY");
    // eslint-disable-next-line no-console
    console.log(process.env.QSTASH_CURRENT_SIGNING_KEY);
    // eslint-disable-next-line no-console
    console.log(process.env.QSTASH_NEXT_SIGNING_KEY);
    // eslint-disable-next-line no-console
    console.log(request?.headers.get("upstash-signature"));
    if (
      await upstashQStashReciver.verify({
        body: (await request?.clone()?.text()) ?? "",
        signature: request?.headers.get("upstash-signature") ?? "",
      })
    ) {
      // eslint-disable-next-line no-console
      console.log("signature ok!");
    } else {
      // eslint-disable-next-line no-console
      console.log("signature NIE ok!");
    }

    return {};
  });

const isShoperProcedure = createServerActionProcedure(isUpstashProcedure)
  .input(z.object({}))
  .handler(async () => {
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
