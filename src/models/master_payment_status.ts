import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { master_status, master_statusId } from './master_status';
import type { order, orderId } from './order';
import type { payment, paymentId } from './payment';

export interface master_payment_statusAttributes {
  id: number;
  name?: string;
  status_id?: number;
}

export type master_payment_statusPk = "id";
export type master_payment_statusId = master_payment_status[master_payment_statusPk];
export type master_payment_statusOptionalAttributes = "name" | "status_id";
export type master_payment_statusCreationAttributes = Optional<master_payment_statusAttributes, master_payment_statusOptionalAttributes>;

export class master_payment_status extends Model<master_payment_statusAttributes, master_payment_statusCreationAttributes> implements master_payment_statusAttributes {
  id!: number;
  name?: string;
  status_id?: number;

  // master_payment_status hasMany order via payment_status_id
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
  // master_payment_status hasMany payment via payment_status_id
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
  // master_payment_status belongsTo master_status via status_id
  status!: master_status;
  getStatus!: Sequelize.BelongsToGetAssociationMixin<master_status>;
  setStatus!: Sequelize.BelongsToSetAssociationMixin<master_status, master_statusId>;
  createStatus!: Sequelize.BelongsToCreateAssociationMixin<master_status>;

  static initModel(sequelize: Sequelize.Sequelize): typeof master_payment_status {
    return master_payment_status.init({
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
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      references: {
        model: 'master_status',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'master_payment_status',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "master_payment_status_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
