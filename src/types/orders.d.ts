export interface OrderItemInput {
  license_id: string; // UUID
  quantity: number;
  amount_per_unit: number;
}

export interface OrderCreatePayload {
  total_amount: number;
  user_id: string; // UUID
  order_items: OrderItemInput[];
}
