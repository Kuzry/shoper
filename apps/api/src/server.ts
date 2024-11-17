import Fastify from "fastify";
import shoperPlugin from "./shoper/routes.js";

const fastify = Fastify({
  logger: true,
});

const init = async () => {
  fastify.register(shoperPlugin, {
    prefix: "/v1/",
  });

  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

void init();
