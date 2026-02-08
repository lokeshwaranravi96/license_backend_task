import { master_status } from "@prisma/client";

export const masterStatus: {
  table: string;
  data: master_status[] | any;
} = {
  table: "master_status",
  data: [
    {
      id: 1,
      name: "active",
      is_active: true,
    },
    {
      id: 2,
      name: "inactive",
      is_active: true,
     
    },
    {
      id: 3,
      name: "deleted",
      is_active: true,
     
    },
   
  ],
};
