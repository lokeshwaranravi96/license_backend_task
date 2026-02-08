import Schema from "fluent-json-schema";
import { commonHeaders } from "../../../../../helpers/schema";


const customParams = Schema.object()
  .prop("limit", Schema.number())
  .prop("offset", Schema.number())
  .prop("search", Schema.string());

export const licensesListSchema = {
  description: "licenses list",
  tags: ["LICENSES"],
  headers: commonHeaders,
  query: customParams,
};