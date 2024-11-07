import { createRouteHandlersForAction } from "zsa-openapi";
import { createServerActionProcedure } from "zsa";
import { upstashQStashReciver } from "@shoper/helpers/upstash/server";

const isUpstashProcedure = createServerActionProcedure().handler(
  async ({ request }) => {
    if (!request) {
      throw Error("No request object");
    }

    /* eslint-disable no-console */
    console.log("..>>>>>>");
    console.log(
      await upstashQStashReciver.verify({
        body: await request.clone()?.text(),
        signature: request.headers.get("upstash-signature") ?? "",
      })
    );

    if (
      await upstashQStashReciver.verify({
        body: await request.clone()?.text(),
        signature: request.headers.get("upstash-signature") ?? "",
      })
    ) {
      // asd
    }

    return {};
  }
);

const isShoperProcedure = createServerActionProcedure(
  isUpstashProcedure
).handler(async () => {
  console.log("isShoperProcedure");
  return {};
});

export const { POST } = createRouteHandlersForAction(
  isShoperProcedure
    .createServerAction()
    // .input(
    //   z.object({
    //     name: z.string().min(3),
    //   })
    // )
    .handler(() => {
      return {
        fafa: "rafa",
      };
    })
);
