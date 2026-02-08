import { FastifyInstance } from "fastify";
import * as schema from "./schema";
import * as handler from "./handlers";

const auth = async (
  fastify: FastifyInstance,
  _opts: any,
  done: any
): Promise<void> => {
  
  fastify.post("/login", { schema: schema.loginSchema }, handler.LOGIN);

  done();
};

export default auth;
