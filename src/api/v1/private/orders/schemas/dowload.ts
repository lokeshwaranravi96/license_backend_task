import Schema from "fluent-json-schema";
import { commonHeaders } from "../../../../../helpers/schema";

const customParams = Schema.object().prop("id", Schema.string());

export const dowloadInvoiceSchema = {
  description: "get dowload pdf",
  tags: ["ORDERS"],
  headers: commonHeaders,
  query: customParams,
};
