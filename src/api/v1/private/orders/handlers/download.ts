import { FastifyReply, FastifyRequest } from "fastify";
import { RESPONSE_MESSAGES } from "@helpers";
import { getInvoiceDetails } from "interactors/orders";
import { queryRequestInfo } from "@mappers";

export const DOWNLOAD_INVOICE = (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id } = queryRequestInfo(request);
      // -----------------------------
      //  INTERACTOR
      // -----------------------------
      const result = await getInvoiceDetails(id);

      // -----------------------------
      //  RESPONSE
      // -----------------------------
      return resolve({
        data: result,
        ...globalThis.status_codes?.success,
        message: RESPONSE_MESSAGES.DATA_FETCHED,
      });
    } catch (error: any) {
      console.log("error DOWNLOAD_INVOICE", error);
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
