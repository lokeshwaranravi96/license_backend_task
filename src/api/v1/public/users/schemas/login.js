import { responseSchema } from "../../../../../helpers/helperFunctions.js";

export const loginSchema = {
  description: "Login a user",
  tags: ["User Management"],
  summary: "Endpoint to login a user",

  body: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: { type: "string" },
      password: { type: "string" }
      }
    }  ,
  response: {
    201: responseSchema,
    400: responseSchema,
    401: responseSchema,
    500: responseSchema
  }
};
