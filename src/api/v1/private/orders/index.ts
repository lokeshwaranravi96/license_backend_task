import { FastifyInstance } from "fastify";
import * as handler from "./handlers";
import * as schema from "./schemas";

const orders = async (fastify: FastifyInstance, _opts: any, done: any) => {
  fastify.addHook("preHandler", fastify.authenticate);
  
  fastify.post(
    "/",
    { schema: schema.addOrderSchema },
    handler.ADD_ORDER
  );

  fastify.get(
    "/",
    { schema: schema.orderListDetailsSchema },
    handler.ORDER_LIST_DETAILS
  );

  done();
};

export default orders;
