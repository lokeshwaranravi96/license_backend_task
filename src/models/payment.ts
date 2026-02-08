import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { master_payment_status, master_payment_statusId } from './master_payment_status';
import type { master_status, master_statusId } from './master_status';
import type { order, orderId } from './order';
import type { user, userId } from './user';

export interface paymentAttributes {
  id: string;
  order_id?: string;
  amount?: number;
  payment_method?: string;
  payment_status_id?: number;
  paid_at?: Date;
  status_id?: number;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
}

export type paymentPk = "id";
export type paymentId = payment[paymentPk];
export type paymentOptionalAttributes = "id" | "order_id" | "amount" | "payment_method" | "payment_status_id" | "paid_at" | "status_id" | "created_at" | "updated_at" | "created_by" | "updated_by";
export type paymentCreationAttributes = Optional<paymentAttributes, paymentOptionalAttributes>;

export class payment extends Model<paymentAttributes, paymentCreationAttributes> implements paymentAttributes {
  id!: string;
  order_id?: string;
  amount?: number;
  payment_method?: string;
  payment_status_id?: number;
  paid_at?: Date;
  status_id?: number;
  created_at!: Date;
  updated_at!: Date;
  created_by?: string;
  updated_by?: string;

  // payment belongsTo master_payment_status via payment_status_id
  payment_status!: master_payment_status;
  getPayment_status!: Sequelize.BelongsToGetAssociationMixin<master_payment_status>;
  setPayment_status!: Sequelize.BelongsToSetAssociationMixin<master_payment_status, master_payment_statusId>;
  createPayment_status!: Sequelize.BelongsToCreateAssociationMixin<master_payment_status>;
  // payment belongsTo master_status via status_id
  status!: master_status;
  getStatus!: Sequelize.BelongsToGetAssociationMixin<master_status>;
  setStatus!: Sequelize.BelongsToSetAssociationMixin<master_status, master_statusId>;
  createStatus!: Sequelize.BelongsToCreateAssociationMixin<master_status>;
  // payment belongsTo order via order_id
  order!: order;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<order>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<order, orderId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<order>;
  // payment belongsTo user via created_by
  created_by_user!: user;
  getCreated_by_user!: Sequelize.BelongsToGetAssociationMixin<user>;
  setCreated_by_user!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createCreated_by_user!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // payment belongsTo user via updated_by
  updated_by_user!: user;
  getUpdated_by_user!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUpdated_by_user!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUpdated_by_user!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof payment {
    return payment.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    payment_method: {
      type: DataTypes.STRING,
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
    paid_at: {
      type: DataTypes.DATE,
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
    tableName: 'payments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "payments_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
