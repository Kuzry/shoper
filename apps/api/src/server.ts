import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

const init = async () => {
  fastify.get("/", async function handler() {
    return {
      hello: "world",
    };
  });

  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

void init();
