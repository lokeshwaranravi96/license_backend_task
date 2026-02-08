
import { order_item, order_itemAttributes } from "models/order_item";
import { Transaction } from "sequelize";

class OrderitemsServices {
  static async bulkCreate(
    items: order_itemAttributes[],
    transaction: Transaction
  ) {
    return new Promise(async (resolve, reject) => { 
      try {
        let result = await order_item.bulkCreate(items, { transaction });
        result = JSON.parse(JSON.stringify(result));
        return resolve(result);
      } catch (error: any) {
        console.error("Error in OrderitemsServices.bulkCreate:", error);
        return reject(error);
      }   
  })
}}

export { OrderitemsServices };
