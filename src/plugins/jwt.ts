import fp from "fastify-plugin";
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt, { FastifyJWTOptions } from "@fastify/jwt";
import { user } from "models/user";
import { RESPONSE_MESSAGES } from "@helpers";

const authorizationMessages = {
  badRequestErrorMessage: `Format must be Authorization: Bearer <token>`,
  noAuthorizationInHeaderMessage: "Authorization header is missing!",
  authorizationTokenExpiredMessage: "Token expired!",
  authorizationTokenInvalid: (err: any) =>
    `Authorization token is invalid: ${err.message}`,
};

export interface UserData {
  user_id?: string;
  iat?: number;
  exp?: number;
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
    publicauthenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: UserData;
  }
}

const jwtPlugin: FastifyPluginAsync<FastifyJWTOptions> = async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
    messages: authorizationMessages,
    sign: { expiresIn: "365d", key: process.env.JWT_SECRET! },
  });

  const commonAuthenticate = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      if (request?.headers?.["authorization"]) {
        await request.jwtVerify();
        if (request?.user?.user_id) {
          let result = await user.findOne({
            where: {
              id: request?.user?.user_id,
           
            },
            attributes: ["id", 'status_id'],
            raw: true,
          });
          if (result?.status_id !== 1) {

          return  reply.code(403).send({
              message:
               RESPONSE_MESSAGES.USER_INACTIVE_OR_DELETED,
            });
          }

        
        }
      } else {
       return reply.code(401).send({message:RESPONSE_MESSAGES.UNAUTHORIZED});
      }
    } catch (err: any) {
     return reply.code(401).send(err.message);
    }
  };

  fastify.decorate(
    "authenticate",
    (request: FastifyRequest, reply: FastifyReply) =>
      commonAuthenticate(request, reply)
  );
  fastify.decorate(
    "publicauthenticate",
    (request: FastifyRequest, reply: FastifyReply) =>
      commonAuthenticate(request, reply)
  );
};

export default fp(jwtPlugin);
