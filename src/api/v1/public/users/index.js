import * as handler from "./handlers/index.js";
import * as schema from "./schemas/index.js";

export default async function users(fastify, opts) {

  // LOGIN USER
  fastify.post("/login", {
    schema: schema.loginSchema},
        handler.loginHandler
  );

}
