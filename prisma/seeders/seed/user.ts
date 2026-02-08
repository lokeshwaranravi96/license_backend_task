import { users } from "@prisma/client";

export const user: {
  table: string;
  data: users[] | any;
} = {
  table: "users",
  data:[{
      id: '53ff1948-7927-4f00-9dd2-a6fe190ce292',
      name: "lokeshwaran",
      email:'lokeshwaranravi96@gmail.com',
      password_hash:'$2b$10$91LJpJyMobNL4v6qW0ocpeAMEcYu6pUOJBsewHWr7HHrf3xQtm1aa', //123456789
      status_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
  
  ],
};
