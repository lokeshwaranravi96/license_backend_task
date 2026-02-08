import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { license, licenseId } from './license';
import type { master_status, master_statusId } from './master_status';
import type { order_item, order_itemId } from './order_item';
import type { order, orderId } from './order';
import type { payment, paymentId } from './payment';

export interface userAttributes {
  id: string;
  name?: string;
  email?: string;
  password_hash?: string;
  status_id?: number;
  refresh_token?: string;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
}

export type userPk = "id";
export type userId = user[userPk];
export type userOptionalAttributes = "id" | "name" | "email" | "password_hash" | "status_id" | "refresh_token" | "created_at" | "updated_at" | "created_by" | "updated_by";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: string;
  name?: string;
  email?: string;
  password_hash?: string;
  status_id?: number;
  refresh_token?: string;
  created_at!: Date;
  updated_at!: Date;
  created_by?: string;
  updated_by?: string;

  // user belongsTo master_status via status_id
  status!: master_status;
  getStatus!: Sequelize.BelongsToGetAssociationMixin<master_status>;
  setStatus!: Sequelize.BelongsToSetAssociationMixin<master_status, master_statusId>;
  createStatus!: Sequelize.BelongsToCreateAssociationMixin<master_status>;
  // user hasMany license via created_by
  licenses!: license[];
  getLicenses!: Sequelize.HasManyGetAssociationsMixin<license>;
  setLicenses!: Sequelize.HasManySetAssociationsMixin<license, licenseId>;
  addLicense!: Sequelize.HasManyAddAssociationMixin<license, licenseId>;
  addLicenses!: Sequelize.HasManyAddAssociationsMixin<license, licenseId>;
  createLicense!: Sequelize.HasManyCreateAssociationMixin<license>;
  removeLicense!: Sequelize.HasManyRemoveAssociationMixin<license, licenseId>;
  removeLicenses!: Sequelize.HasManyRemoveAssociationsMixin<license, licenseId>;
  hasLicense!: Sequelize.HasManyHasAssociationMixin<license, licenseId>;
  hasLicenses!: Sequelize.HasManyHasAssociationsMixin<license, licenseId>;
  countLicenses!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany license via updated_by
  updated_by_licenses!: license[];
  getUpdated_by_licenses!: Sequelize.HasManyGetAssociationsMixin<license>;
  setUpdated_by_licenses!: Sequelize.HasManySetAssociationsMixin<license, licenseId>;
  addUpdated_by_license!: Sequelize.HasManyAddAssociationMixin<license, licenseId>;
  addUpdated_by_licenses!: Sequelize.HasManyAddAssociationsMixin<license, licenseId>;
  createUpdated_by_license!: Sequelize.HasManyCreateAssociationMixin<license>;
  removeUpdated_by_license!: Sequelize.HasManyRemoveAssociationMixin<license, licenseId>;
  removeUpdated_by_licenses!: Sequelize.HasManyRemoveAssociationsMixin<license, licenseId>;
  hasUpdated_by_license!: Sequelize.HasManyHasAssociationMixin<license, licenseId>;
  hasUpdated_by_licenses!: Sequelize.HasManyHasAssociationsMixin<license, licenseId>;
  countUpdated_by_licenses!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany order_item via created_by
  order_items!: order_item[];
  getOrder_items!: Sequelize.HasManyGetAssociationsMixin<order_item>;
  setOrder_items!: Sequelize.HasManySetAssociationsMixin<order_item, order_itemId>;
  addOrder_item!: Sequelize.HasManyAddAssociationMixin<order_item, order_itemId>;
  addOrder_items!: Sequelize.HasManyAddAssociationsMixin<order_item, order_itemId>;
  createOrder_item!: Sequelize.HasManyCreateAssociationMixin<order_item>;
  removeOrder_item!: Sequelize.HasManyRemoveAssociationMixin<order_item, order_itemId>;
  removeOrder_items!: Sequelize.HasManyRemoveAssociationsMixin<order_item, order_itemId>;
  hasOrder_item!: Sequelize.HasManyHasAssociationMixin<order_item, order_itemId>;
  hasOrder_items!: Sequelize.HasManyHasAssociationsMixin<order_item, order_itemId>;
  countOrder_items!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany order_item via updated_by
  updated_by_order_items!: order_item[];
  getUpdated_by_order_items!: Sequelize.HasManyGetAssociationsMixin<order_item>;
  setUpdated_by_order_items!: Sequelize.HasManySetAssociationsMixin<order_item, order_itemId>;
  addUpdated_by_order_item!: Sequelize.HasManyAddAssociationMixin<order_item, order_itemId>;
  addUpdated_by_order_items!: Sequelize.HasManyAddAssociationsMixin<order_item, order_itemId>;
  createUpdated_by_order_item!: Sequelize.HasManyCreateAssociationMixin<order_item>;
  removeUpdated_by_order_item!: Sequelize.HasManyRemoveAssociationMixin<order_item, order_itemId>;
  removeUpdated_by_order_items!: Sequelize.HasManyRemoveAssociationsMixin<order_item, order_itemId>;
  hasUpdated_by_order_item!: Sequelize.HasManyHasAssociationMixin<order_item, order_itemId>;
  hasUpdated_by_order_items!: Sequelize.HasManyHasAssociationsMixin<order_item, order_itemId>;
  countUpdated_by_order_items!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany order_item via user_id
  user_order_items!: order_item[];
  getUser_order_items!: Sequelize.HasManyGetAssociationsMixin<order_item>;
  setUser_order_items!: Sequelize.HasManySetAssociationsMixin<order_item, order_itemId>;
  addUser_order_item!: Sequelize.HasManyAddAssociationMixin<order_item, order_itemId>;
  addUser_order_items!: Sequelize.HasManyAddAssociationsMixin<order_item, order_itemId>;
  createUser_order_item!: Sequelize.HasManyCreateAssociationMixin<order_item>;
  removeUser_order_item!: Sequelize.HasManyRemoveAssociationMixin<order_item, order_itemId>;
  removeUser_order_items!: Sequelize.HasManyRemoveAssociationsMixin<order_item, order_itemId>;
  hasUser_order_item!: Sequelize.HasManyHasAssociationMixin<order_item, order_itemId>;
  hasUser_order_items!: Sequelize.HasManyHasAssociationsMixin<order_item, order_itemId>;
  countUser_order_items!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany order via created_by
  orders!: order[];
  getOrders!: Sequelize.HasManyGetAssociationsMixin<order>;
  setOrders!: Sequelize.HasManySetAssociationsMixin<order, orderId>;
  addOrder!: Sequelize.HasManyAddAssociationMixin<order, orderId>;
  addOrders!: Sequelize.HasManyAddAssociationsMixin<order, orderId>;
  createOrder!: Sequelize.HasManyCreateAssociationMixin<order>;
  removeOrder!: Sequelize.HasManyRemoveAssociationMixin<order, orderId>;
  removeOrders!: Sequelize.HasManyRemoveAssociationsMixin<order, orderId>;
  hasOrder!: Sequelize.HasManyHasAssociationMixin<order, orderId>;
  hasOrders!: Sequelize.HasManyHasAssociationsMixin<order, orderId>;
  countOrders!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany order via updated_by
  updated_by_orders!: order[];
  getUpdated_by_orders!: Sequelize.HasManyGetAssociationsMixin<order>;
  setUpdated_by_orders!: Sequelize.HasManySetAssociationsMixin<order, orderId>;
  addUpdated_by_order!: Sequelize.HasManyAddAssociationMixin<order, orderId>;
  addUpdated_by_orders!: Sequelize.HasManyAddAssociationsMixin<order, orderId>;
  createUpdated_by_order!: Sequelize.HasManyCreateAssociationMixin<order>;
  removeUpdated_by_order!: Sequelize.HasManyRemoveAssociationMixin<order, orderId>;
  removeUpdated_by_orders!: Sequelize.HasManyRemoveAssociationsMixin<order, orderId>;
  hasUpdated_by_order!: Sequelize.HasManyHasAssociationMixin<order, orderId>;
  hasUpdated_by_orders!: Sequelize.HasManyHasAssociationsMixin<order, orderId>;
  countUpdated_by_orders!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany order via user_id
  user_orders!: order[];
  getUser_orders!: Sequelize.HasManyGetAssociationsMixin<order>;
  setUser_orders!: Sequelize.HasManySetAssociationsMixin<order, orderId>;
  addUser_order!: Sequelize.HasManyAddAssociationMixin<order, orderId>;
  addUser_orders!: Sequelize.HasManyAddAssociationsMixin<order, orderId>;
  createUser_order!: Sequelize.HasManyCreateAssociationMixin<order>;
  removeUser_order!: Sequelize.HasManyRemoveAssociationMixin<order, orderId>;
  removeUser_orders!: Sequelize.HasManyRemoveAssociationsMixin<order, orderId>;
  hasUser_order!: Sequelize.HasManyHasAssociationMixin<order, orderId>;
  hasUser_orders!: Sequelize.HasManyHasAssociationsMixin<order, orderId>;
  countUser_orders!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany payment via created_by
  payments!: payment[];
  getPayments!: Sequelize.HasManyGetAssociationsMixin<payment>;
  setPayments!: Sequelize.HasManySetAssociationsMixin<payment, paymentId>;
  addPayment!: Sequelize.HasManyAddAssociationMixin<payment, paymentId>;
  addPayments!: Sequelize.HasManyAddAssociationsMixin<payment, paymentId>;
  createPayment!: Sequelize.HasManyCreateAssociationMixin<payment>;
  removePayment!: Sequelize.HasManyRemoveAssociationMixin<payment, paymentId>;
  removePayments!: Sequelize.HasManyRemoveAssociationsMixin<payment, paymentId>;
  hasPayment!: Sequelize.HasManyHasAssociationMixin<payment, paymentId>;
  hasPayments!: Sequelize.HasManyHasAssociationsMixin<payment, paymentId>;
  countPayments!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany payment via updated_by
  updated_by_payments!: payment[];
  getUpdated_by_payments!: Sequelize.HasManyGetAssociationsMixin<payment>;
  setUpdated_by_payments!: Sequelize.HasManySetAssociationsMixin<payment, paymentId>;
  addUpdated_by_payment!: Sequelize.HasManyAddAssociationMixin<payment, paymentId>;
  addUpdated_by_payments!: Sequelize.HasManyAddAssociationsMixin<payment, paymentId>;
  createUpdated_by_payment!: Sequelize.HasManyCreateAssociationMixin<payment>;
  removeUpdated_by_payment!: Sequelize.HasManyRemoveAssociationMixin<payment, paymentId>;
  removeUpdated_by_payments!: Sequelize.HasManyRemoveAssociationsMixin<payment, paymentId>;
  hasUpdated_by_payment!: Sequelize.HasManyHasAssociationMixin<payment, paymentId>;
  hasUpdated_by_payments!: Sequelize.HasManyHasAssociationsMixin<payment, paymentId>;
  countUpdated_by_payments!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      references: {
        model: 'master_status',
        key: 'id'
      }
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
