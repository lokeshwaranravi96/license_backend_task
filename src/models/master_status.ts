import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { license, licenseId } from './license';
import type { master_payment_status, master_payment_statusId } from './master_payment_status';
import type { order_item, order_itemId } from './order_item';
import type { order, orderId } from './order';
import type { payment, paymentId } from './payment';
import type { user, userId } from './user';

export interface master_statusAttributes {
  id: number;
  name?: string;
  is_active?: boolean;
}

export type master_statusPk = "id";
export type master_statusId = master_status[master_statusPk];
export type master_statusOptionalAttributes = "name" | "is_active";
export type master_statusCreationAttributes = Optional<master_statusAttributes, master_statusOptionalAttributes>;

export class master_status extends Model<master_statusAttributes, master_statusCreationAttributes> implements master_statusAttributes {
  id!: number;
  name?: string;
  is_active?: boolean;

  // master_status hasMany license via status_id
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
  // master_status hasMany master_payment_status via status_id
  master_payment_statuses!: master_payment_status[];
  getMaster_payment_statuses!: Sequelize.HasManyGetAssociationsMixin<master_payment_status>;
  setMaster_payment_statuses!: Sequelize.HasManySetAssociationsMixin<master_payment_status, master_payment_statusId>;
  addMaster_payment_status!: Sequelize.HasManyAddAssociationMixin<master_payment_status, master_payment_statusId>;
  addMaster_payment_statuses!: Sequelize.HasManyAddAssociationsMixin<master_payment_status, master_payment_statusId>;
  createMaster_payment_status!: Sequelize.HasManyCreateAssociationMixin<master_payment_status>;
  removeMaster_payment_status!: Sequelize.HasManyRemoveAssociationMixin<master_payment_status, master_payment_statusId>;
  removeMaster_payment_statuses!: Sequelize.HasManyRemoveAssociationsMixin<master_payment_status, master_payment_statusId>;
  hasMaster_payment_status!: Sequelize.HasManyHasAssociationMixin<master_payment_status, master_payment_statusId>;
  hasMaster_payment_statuses!: Sequelize.HasManyHasAssociationsMixin<master_payment_status, master_payment_statusId>;
  countMaster_payment_statuses!: Sequelize.HasManyCountAssociationsMixin;
  // master_status hasMany order_item via status_id
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
  // master_status hasMany order via status_id
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
  // master_status hasMany payment via status_id
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
  // master_status hasMany user via status_id
  users!: user[];
  getUsers!: Sequelize.HasManyGetAssociationsMixin<user>;
  setUsers!: Sequelize.HasManySetAssociationsMixin<user, userId>;
  addUser!: Sequelize.HasManyAddAssociationMixin<user, userId>;
  addUsers!: Sequelize.HasManyAddAssociationsMixin<user, userId>;
  createUser!: Sequelize.HasManyCreateAssociationMixin<user>;
  removeUser!: Sequelize.HasManyRemoveAssociationMixin<user, userId>;
  removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<user, userId>;
  hasUser!: Sequelize.HasManyHasAssociationMixin<user, userId>;
  hasUsers!: Sequelize.HasManyHasAssociationsMixin<user, userId>;
  countUsers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof master_status {
    return master_status.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'master_status',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "master_status_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
