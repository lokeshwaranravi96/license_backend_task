import Schema from "fluent-json-schema";
import { commonHeaders } from "../../../../../helpers/schema";


export const addOrderSchema = {
  tags: ["ORDERS"],
  description: "Adding Order",
  headers: commonHeaders,
  body: Schema.object()
    .prop("total_amount", Schema.number().required())
    .prop("order_items", Schema.array().items(Schema.object()
      .prop("license_id", Schema.string().required())
      .prop("quantity", Schema.number().required())
      .prop("amount_per_unit", Schema.number().required())
    ).required())
  
};
