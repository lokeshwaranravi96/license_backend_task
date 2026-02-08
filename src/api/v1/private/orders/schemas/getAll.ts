import Schema from "fluent-json-schema";
import { commonHeaders } from "../../../../../helpers/schema";


const customParams = Schema.object()
  .prop("limit", Schema.number())
  .prop("offset", Schema.number())
  .prop("search", Schema.string());

export const orderListDetailsSchema = {
  description: "orders list details",
  tags: ["ACCESS"],
  headers: commonHeaders,
  query: customParams,
};