import { FastifyReply, FastifyRequest } from "fastify";
import {  queryRequestInfo } from "../../../../../mappers";
import { licensesList } from "interactors/licenses";
import { RESPONSE_MESSAGES } from "@helpers";

export const LICENSES_LIST = (
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
      const result = await licensesList({
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

      console.log("error LICENSES_LIST", error);
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

