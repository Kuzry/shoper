import { FastifyPluginCallback } from "fastify/types/plugin.js";

const shoperPlugin: FastifyPluginCallback = (fastify, options, done) => {
  fastify.register(
    (fastify, options, done) => {
      fastify.route({
        method: "GET",
        url: "/billing",
        handler: () => {
          return {
            ping: "pong!",
          };
        },
      });

      done();
    },
    {
      prefix: "/shoper",
    }
  );

  done();
};

export default shoperPlugin;
