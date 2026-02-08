import { master_payment_status } from "@prisma/client";

export const masterPaymentStatus: {
  table: string;
  data: master_payment_status[] | any;
} = {
  table: "master_payment_status",
  data:[{
      id: 1,
      name: "pending",
      status_id: 1,
    },
    {
      id: 2,
      name: "success",
      status_id: 1,
    },
    {
      id: 3,
      name: "failed",
      status_id: 1,
    },
  ],
};
