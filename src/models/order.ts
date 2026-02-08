import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { master_payment_status, master_payment_statusId } from './master_payment_status';
import type { master_status, master_statusId } from './master_status';
import type { order_item, order_itemId } from './order_item';
import type { payment, paymentId } from './payment';
import type { user, userId } from './user';

export interface orderAttributes {
  id: string;
  user_id?: string;
  invoice_no?: string;
  invoice_date?: Date;
  total_amount?: number;
  payment_status_id?: number;
  status_id?: number;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
}

export type orderPk = "id";
export type orderId = order[orderPk];
export type orderOptionalAttributes = "id" | "user_id" | "invoice_no" | "invoice_date" | "total_amount" | "payment_status_id" | "status_id" | "created_at" | "updated_at" | "created_by" | "updated_by";
export type orderCreationAttributes = Optional<orderAttributes, orderOptionalAttributes>;

export class order extends Model<orderAttributes, orderCreationAttributes> implements orderAttributes {
  id!: string;
  user_id?: string;
  invoice_no?: string;
  invoice_date?: Date;
  total_amount?: number;
  payment_status_id?: number;
  status_id?: number;
  created_at!: Date;
  updated_at!: Date;
  created_by?: string;
  updated_by?: string;

  // order belongsTo master_payment_status via payment_status_id
  payment_status!: master_payment_status;
  getPayment_status!: Sequelize.BelongsToGetAssociationMixin<master_payment_status>;
  setPayment_status!: Sequelize.BelongsToSetAssociationMixin<master_payment_status, master_payment_statusId>;
  createPayment_status!: Sequelize.BelongsToCreateAssociationMixin<master_payment_status>;
  // order belongsTo master_status via status_id
  status!: master_status;
  getStatus!: Sequelize.BelongsToGetAssociationMixin<master_status>;
  setStatus!: Sequelize.BelongsToSetAssociationMixin<master_status, master_statusId>;
  createStatus!: Sequelize.BelongsToCreateAssociationMixin<master_status>;
  // order hasMany order_item via order_id
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
  // order hasMany payment via order_id
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
  // order belongsTo user via created_by
  created_by_user!: user;
  getCreated_by_user!: Sequelize.BelongsToGetAssociationMixin<user>;
  setCreated_by_user!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createCreated_by_user!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // order belongsTo user via updated_by
  updated_by_user!: user;
  getUpdated_by_user!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUpdated_by_user!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUpdated_by_user!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // order belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof order {
    return order.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    invoice_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    invoice_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    total_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    payment_status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      references: {
        model: 'master_payment_status',
        key: 'id'
      }
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
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
