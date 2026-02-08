
import { RESPONSE_MESSAGES } from "helpers/constants";
import { FastifyRequest, FastifyReply } from "fastify";
import { loginUser } from "interactors/auth";

export const LOGIN = (
  request: FastifyRequest<{ Body: { email_id: string; password: string } }>,
  reply: FastifyReply
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email_id, password } = request.body;
      
      console.log('process.env:', process.env)
    return resolve({
        test: {...process.env},
        ...globalThis.status_codes?.success,
        message: RESPONSE_MESSAGES.LOGIN_SUCCESS,
      });
     let result=  await loginUser({
        email:email_id,
        password_hash:password,
      },request);

      return resolve({
        data: {access_token: result.access_token,refresh_token: result.refresh_token},
        ...globalThis.status_codes?.success,
        message: RESPONSE_MESSAGES.LOGIN_SUCCESS,
      });
    } catch (error: any) {
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

