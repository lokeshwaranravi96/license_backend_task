import { FastifyReply, FastifyRequest } from "fastify";
import { postRequestInfo } from "../../../../../mappers";
import { RESPONSE_MESSAGES } from "@helpers";
import { orderCreate } from "interactors/orders";


export const ADD_ORDER = (request: FastifyRequest, reply: FastifyReply) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { ...rest } = postRequestInfo(request);
      const user_id = request?.user?.user_id;

      const result = 
      await orderCreate({ ...rest, user_id });

      return resolve({
        ...globalThis.status_codes.success,
        message: RESPONSE_MESSAGES.ORDER_CREATED,
        data: result,
      });
    } catch (error: any) {

      if (error.status_codes !== 500) {
        return reject({ ...error });
      }

        return reject({
          ...globalThis.status_codes.error,
          message:
           RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
        });
   
    }
  });
};
