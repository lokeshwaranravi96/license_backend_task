import { licenses } from "@prisma/client";

export const licensesList: {
  table: string;
  data: licenses[] | any;
} = {
  table: "licenses",
  data:[{
      id: '53ff1948-7927-4f00-9dd2-a6fe190ce291',
      name: "Licenses A",
      status_id: 1,
      monthly_price: 10,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '53ff1948-7927-4f00-9dd2-a6fe190ce293',
      name: "Licenses B",
      status_id: 1,
      monthly_price: 20,
      created_at: new Date(),
      updated_at: new Date(),
    }
  ],
};
