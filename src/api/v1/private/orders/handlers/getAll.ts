import { FastifyReply, FastifyRequest } from "fastify";
import {  queryRequestInfo } from "../../../../../mappers";
import { RESPONSE_MESSAGES } from "@helpers";
import { listAllOrderDetails } from "interactors/orders";

export const ORDER_LIST_DETAILS = (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // -----------------------------
      //  MAPPER
      // -----------------------------
      const {  offset, limit } = queryRequestInfo(request);
      // -----------------------------
      //  INTERACTOR
      // -----------------------------
      const result = await listAllOrderDetails({
        offset,
        limit,
      });
     
      // -----------------------------
      //  RESPONSE
      // -----------------------------
      return resolve({
        data:result,
        ...globalThis.status_codes?.success,
        message: RESPONSE_MESSAGES.DATA_FETCHED,
      });
    } catch (error: any) {

      console.log("error LIST_ALL_ORDER_DETAILS", error);
       if (error.status_codes !== 500) {
        return reject({ ...error });
      }

      return reject({
        ...globalThis.status_codes?.error,
        message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  });
};

