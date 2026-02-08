import { FastifyRequest } from "fastify";
import { processNestedObjects } from "../helpers";
/**
 * Extracts relevant parameters from a FastifyRequest object.
 *
 * @param {FastifyRequest} request - The FastifyRequest object containing body parameters and URL.
 * @returns An object containing extracted parameters.
 * @throws {Error} Throws an error if there's an issue extracting parameters.
 */
function postRequestInfo<T>(request: FastifyRequest) {
  try {
    const body = request.body as any;
    const params = request.params as any;
    processNestedObjects(body);
    return {
      ...body,
      ...params,
    };
  } catch (error: any) {
    console.log("error:postRequestInfo", error);
    throw error;
  }
}

export { postRequestInfo };
