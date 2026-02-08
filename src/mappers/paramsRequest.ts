/**
 * Extracts relevant parameters from a FastifyRequest object.
 *
 * @param {FastifyRequest} request - The FastifyRequest object containing params parameters and URL.
 * @returns  An object containing extracted parameters (id, ....).
 * @throws {Error} Throws an error if there's an issue extracting parameters.
 */
function paramsRequestInfo<T>(request: any) {
  try {
    const params = request.params as T;

    return {
      ...params,
    };
  } catch (error: any) {
    throw new Error("Failed to extract request parameters.");
  }
}

export { paramsRequestInfo };
