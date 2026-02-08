import { getSequelizeConnection } from "@db";
import { OrderitemsServices } from "services/order_items";
import { OrdersServices } from "services/orders";
import moment = require("moment");
import { CommonGetOptions, OrderCreatePayload } from "@types";


/**
 * Calculate prorated amount based on remaining days until expiry
 */
const calculateProratedAmount = (
  requestedAmount: number,
  expiryDate: string,
  originalStartDate: string
): { proratedAmount: number; remainingDays: number; perDayCharge: number } => {
  const today = moment().startOf("day");
  const expiry = moment(expiryDate).startOf("day");
  const originalStart = moment(originalStartDate).startOf("day");

  // Calculate remaining days from today to expiry
  const remainingDays = expiry.diff(today, "days") + 1;

  // Calculate original cycle days
  const originalCycleDays = expiry.diff(originalStart, "days") + 1;

  // Calculate per-day cost
  const perDayCharge = requestedAmount / originalCycleDays;

  // Calculate prorated amount
  const proratedAmount = Math.ceil(perDayCharge * remainingDays);

  return { proratedAmount, remainingDays, perDayCharge };
};

export const orderCreate = (options: OrderCreatePayload): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const sequelize = getSequelizeConnection(null);
    const transaction = await sequelize.transaction();

    try {
      // 1️⃣ Get previous active order
      const previousOrder = await OrdersServices.findOne(
        {
          user_id: options.user_id,
          status_id: 1,
        }
      );

      const prevItem = previousOrder?.order_items?.[0];
      const prevStart = prevItem?.start_date;
      const prevExpiry = prevItem?.expiry_date;

      const user_pay = options.total_amount;

      // 2️⃣ Calculate expiry date
      const expiryDate =
        prevExpiry ??
        moment().add(1, "month").subtract(1, "day").format("YYYY-MM-DD");

      // 3️⃣ Parent-level validation
      if (previousOrder) {
        const prorated = calculateProratedAmount(
          user_pay,
          prevExpiry,
          prevStart
        );

        /// if prorated amount is greater than user pay then reject the request
        if (prorated.proratedAmount > user_pay) {
          await transaction.rollback();
          return reject({
            ...globalThis.status_codes.bad_request,
            message: "Amount mismatch",
            data: {
              expected: prorated.proratedAmount,
              actual: user_pay,
            },
          });
        }
      }

      let count= await OrdersServices.count()
      // 4️⃣ Create order
      const order = await OrdersServices.create(
        {
          invoice_no: `INV-${count + 1}`,
          invoice_date: new Date(),
          total_amount: user_pay,
          payment_status_id: 1, // Assuming 1 is the default payment status (e.g., pending)
          user_id: options.user_id,
          status_id: 1,
          created_by: options.user_id,
        },
        transaction
      );

      // 5️⃣ Prepare order items (SYNC map)
      const orderItemsData = options.order_items.map((item:any) => {
        const amountPerQty = item.amount_per_unit || 0;

        const prorated = calculateProratedAmount(
          amountPerQty,
          prevExpiry,
          prevStart
        );

        /// if prorated amount is greater than amount per qty then reject the request
        if (prorated.proratedAmount > amountPerQty) {

           return reject({
             data: {
               expected: prorated.proratedAmount,
               actual: amountPerQty},
               ...globalThis.status_codes.bad_request,
             message: "Item amount mismatch",
          });
          
        }

        console.log('order:', order)
        return {
          ...item,
          amount_per_qty: amountPerQty,
          amount_total_qty: amountPerQty * item.quantity,
          purchase_date: new Date(),
          start_date: new Date(),
          expiry_date: expiryDate,
          order_id: order.id,
          status_id: 1,
          created_by: options.user_id,
          user_id: options.user_id,
        };
      });

      // 6️⃣ Bulk create items
      await OrderitemsServices.bulkCreate(orderItemsData, transaction);

      // 7️⃣ Commit transaction
      await transaction.commit();

      return resolve({
          order,
      });
    } catch (error) {
      await transaction.rollback();
      return reject(error);
    }
  });
};




export const listAllOrderDetails = (options: CommonGetOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await OrdersServices.findAll(options);
    
      return resolve(result);
    } catch (error: any) {
      return reject(error);
    }
  });
};
