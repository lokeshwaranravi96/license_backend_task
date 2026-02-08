import { FastifyInstance } from "fastify";
import * as handler from "./handlers";
import * as schema from "./schemas";

const licenses = async (fastify: FastifyInstance, _opts: any, done: any) => {
  fastify.addHook("preHandler", fastify.authenticate);
  
  fastify.get(
    "/list",
    { schema: schema.licensesListSchema },
    handler.LICENSES_LIST
  );

  done();
};

export default licenses;
