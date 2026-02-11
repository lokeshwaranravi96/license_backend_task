import { FastifyInstance } from "fastify";
import * as handler from "./handlers";
import * as schema from "./schemas";

const orders = async (fastify: FastifyInstance, _opts: any, done: any) => {
  fastify.addHook("preHandler", fastify.authenticate);

  fastify.post("/", { schema: schema.addOrderSchema }, handler.ADD_ORDER);

  fastify.get(
    "/",
    { schema: schema.orderListDetailsSchema },
    handler.ORDER_LIST_DETAILS
  );

  fastify.get(
    "/active",
    { schema: schema.getActiveRecordSchema },
    handler.GET_ACTIVE_RECORD
  );

  fastify.get(
    "/download",
    { schema: schema.dowloadInvoiceSchema },
    handler.DOWNLOAD_INVOICE
  );

  done();
};

export default orders;
