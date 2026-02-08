import {
  PrismaClient,
  master_status,
  master_payment_status,
} from "@prisma/client";
const prisma = new PrismaClient();

import * as Seeds from "./seed";

const main = async () => {
  console.log("Seeding in Progress.....");

  let upsertPromises: any[] = [];
  Object.values(Seeds).forEach((seed: { table: string; data: any[] }) => {
    

  console.log('seed.table :===>', seed.table )

    if (seed.table == "master_status") {
      seed.data.forEach((data: master_status) => {
        upsertPromises.push(
          prisma.master_status.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          })
        );
      });
    }

    if (seed.table == "master_payment_status") {
      seed.data.forEach((data: master_payment_status) => {
        upsertPromises.push(
          prisma.master_payment_status.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          })
        );
      });
    }

    if(seed.table == "users"){
      seed.data.forEach((data: any) => {
        upsertPromises.push(
          prisma.users.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          })
        );
      });
    }

    if(seed.table == "licenses"){
      seed.data.forEach((data: any) => {
        upsertPromises.push(
          prisma.licenses.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          })
        );
      });
    }
  });

  await Promise.all(upsertPromises);

  console.log("Seeding Completed");
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
