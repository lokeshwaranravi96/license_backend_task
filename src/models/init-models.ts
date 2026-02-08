import type { Sequelize } from "sequelize";
import { license as _license } from "./license";
import type { licenseAttributes, licenseCreationAttributes } from "./license";
import { master_payment_status as _master_payment_status } from "./master_payment_status";
import type { master_payment_statusAttributes, master_payment_statusCreationAttributes } from "./master_payment_status";
import { master_status as _master_status } from "./master_status";
import type { master_statusAttributes, master_statusCreationAttributes } from "./master_status";
import { order_item as _order_item } from "./order_item";
import type { order_itemAttributes, order_itemCreationAttributes } from "./order_item";
import { order as _order } from "./order";
import type { orderAttributes, orderCreationAttributes } from "./order";
import { payment as _payment } from "./payment";
import type { paymentAttributes, paymentCreationAttributes } from "./payment";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";

export {
  _license as license,
  _master_payment_status as master_payment_status,
  _master_status as master_status,
  _order_item as order_item,
  _order as order,
  _payment as payment,
  _user as user,
};

export type {
  licenseAttributes,
  licenseCreationAttributes,
  master_payment_statusAttributes,
  master_payment_statusCreationAttributes,
  master_statusAttributes,
  master_statusCreationAttributes,
  order_itemAttributes,
  order_itemCreationAttributes,
  orderAttributes,
  orderCreationAttributes,
  paymentAttributes,
  paymentCreationAttributes,
  userAttributes,
  userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const license = _license.initModel(sequelize);
  const master_payment_status = _master_payment_status.initModel(sequelize);
  const master_status = _master_status.initModel(sequelize);
  const order_item = _order_item.initModel(sequelize);
  const order = _order.initModel(sequelize);
  const payment = _payment.initModel(sequelize);
  const user = _user.initModel(sequelize);

  order_item.belongsTo(license, { as: "license", foreignKey: "license_id"});
  license.hasMany(order_item, { as: "order_items", foreignKey: "license_id"});
  order.belongsTo(master_payment_status, { as: "payment_status", foreignKey: "payment_status_id"});
  master_payment_status.hasMany(order, { as: "orders", foreignKey: "payment_status_id"});
  payment.belongsTo(master_payment_status, { as: "payment_status", foreignKey: "payment_status_id"});
  master_payment_status.hasMany(payment, { as: "payments", foreignKey: "payment_status_id"});
  license.belongsTo(master_status, { as: "status", foreignKey: "status_id"});
  master_status.hasMany(license, { as: "licenses", foreignKey: "status_id"});
  master_payment_status.belongsTo(master_status, { as: "status", foreignKey: "status_id"});
  master_status.hasMany(master_payment_status, { as: "master_payment_statuses", foreignKey: "status_id"});
  order_item.belongsTo(master_status, { as: "status", foreignKey: "status_id"});
  master_status.hasMany(order_item, { as: "order_items", foreignKey: "status_id"});
  order.belongsTo(master_status, { as: "status", foreignKey: "status_id"});
  master_status.hasMany(order, { as: "orders", foreignKey: "status_id"});
  payment.belongsTo(master_status, { as: "status", foreignKey: "status_id"});
  master_status.hasMany(payment, { as: "payments", foreignKey: "status_id"});
  user.belongsTo(master_status, { as: "status", foreignKey: "status_id"});
  master_status.hasMany(user, { as: "users", foreignKey: "status_id"});
  order_item.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(order_item, { as: "order_items", foreignKey: "order_id"});
  payment.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(payment, { as: "payments", foreignKey: "order_id"});
  license.belongsTo(user, { as: "created_by_user", foreignKey: "created_by"});
  user.hasMany(license, { as: "licenses", foreignKey: "created_by"});
  license.belongsTo(user, { as: "updated_by_user", foreignKey: "updated_by"});
  user.hasMany(license, { as: "updated_by_licenses", foreignKey: "updated_by"});
  order_item.belongsTo(user, { as: "created_by_user", foreignKey: "created_by"});
  user.hasMany(order_item, { as: "order_items", foreignKey: "created_by"});
  order_item.belongsTo(user, { as: "updated_by_user", foreignKey: "updated_by"});
  user.hasMany(order_item, { as: "updated_by_order_items", foreignKey: "updated_by"});
  order_item.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(order_item, { as: "user_order_items", foreignKey: "user_id"});
  order.belongsTo(user, { as: "created_by_user", foreignKey: "created_by"});
  user.hasMany(order, { as: "orders", foreignKey: "created_by"});
  order.belongsTo(user, { as: "updated_by_user", foreignKey: "updated_by"});
  user.hasMany(order, { as: "updated_by_orders", foreignKey: "updated_by"});
  order.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(order, { as: "user_orders", foreignKey: "user_id"});
  payment.belongsTo(user, { as: "created_by_user", foreignKey: "created_by"});
  user.hasMany(payment, { as: "payments", foreignKey: "created_by"});
  payment.belongsTo(user, { as: "updated_by_user", foreignKey: "updated_by"});
  user.hasMany(payment, { as: "updated_by_payments", foreignKey: "updated_by"});

  return {
    license: license,
    master_payment_status: master_payment_status,
    master_status: master_status,
    order_item: order_item,
    order: order,
    payment: payment,
    user: user,
  };
}
