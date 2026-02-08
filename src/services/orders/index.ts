import { CommonGetOptions } from "@types";
import { master_payment_status } from "models/master_payment_status";
import { order, orderAttributes } from "models/order";
import { order_item } from "models/order_item";
import { Transaction, WhereOptions } from "sequelize";

class OrdersServices {
  static async create(
    options: Omit<orderAttributes, "id" | "created_at" | "updated_at">,
    transaction: Transaction
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
    try {
      let result = await order.create(options, { transaction });
      result = JSON.parse(JSON.stringify(result));
      return resolve(result);
    } catch (error: any) {
      console.error("Error in OrdersServices.create:", error);
      return reject(error);
    }
})
  }

 static async count(filters?: Partial<orderAttributes>): Promise<number> {
  return new Promise(async (resolve, reject) => {
  try {
    const where: WhereOptions = {};

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof orderAttributes] !== undefined) {
          where[key as keyof orderAttributes] = filters[key as keyof orderAttributes];
        }
      });
    }

    let result=await order.count({ where });
    return resolve(result);
  } catch (error) {
    console.error("Error in OrdersServices.count:", error);
    return reject(error);
  }
});
}

  static async findOne(filters?: Partial<orderAttributes>): Promise<any> {
  return new Promise(async (resolve, reject) => {
  try {


    const where: WhereOptions = {};

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof orderAttributes] !== undefined) {
          where[key as keyof orderAttributes] = filters[key as keyof orderAttributes];
        }
      });
    }

    let result=await order.findOne({ where,  
      include: [  {
              model: order_item,
              required: false,
              as: "order_items",
              where: {
                  status_id: 1,
                  
              },
            },] }  );

    result= JSON.parse(JSON.stringify(result))
    return resolve(result);
  } catch (error) {
    console.error("Error in OrdersServices.findOne:", error);
    return reject(error);
  }
});
}

/// find all with pagination and filters
 static async findAll(options?:CommonGetOptions): Promise<any> {
  return new Promise(async (resolve, reject) => {
  try {

    const {offset=0,limit=10,sort_by='DESC'}= options || {}

   
    let result=await order.findAll({ where:{status_id:1},  
      include: [  {
              model: order_item,
              required: false,
              as: "order_items",
              where: {
                  status_id: 1,
                  
              },
            },
          {
              model: master_payment_status,
              required: false,
              as: "payment_status",
              where: {
                  status_id: 1,
              },
            }
          ], offset, limit,order:[['created_at',sort_by]] }  );

    result= JSON.parse(JSON.stringify(result))
    return resolve(result);
  } catch (error) {
    console.error("Error in OrdersServices.findAll:", error);
    return reject(error);
  }
});
}
}

export { OrdersServices };
