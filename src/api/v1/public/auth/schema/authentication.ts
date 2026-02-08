import Schema from "fluent-json-schema";
// Helpers
import { makeResponseSchema } from "../../../../../helpers";

const loginBody = Schema.object()
  .prop("email_id", Schema.string().format("email").required())
  .prop("password", Schema.string().required());

export const loginSchema = {
  description: "A login Schema",
  tags: ["AUTH"],
  body: loginBody,
  response: makeResponseSchema(
    Schema.object()
    .prop('test',Schema.object().additionalProperties(true))
      .prop("data", Schema.object()
      .prop('access_token',Schema.string()).prop('refresh_token',Schema.string()))
      .prop("status", Schema.integer())
      .prop("api_status", Schema.string())
      .prop("message", Schema.string())
      .additionalProperties(true)
  ),
};

