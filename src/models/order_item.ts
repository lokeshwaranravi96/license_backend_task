import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { license, licenseId } from './license';
import type { master_status, master_statusId } from './master_status';
import type { order, orderId } from './order';
import type { user, userId } from './user';

export interface order_itemAttributes {
  id: string;
  user_id?: string;
  order_id?: string;
  license_id?: string;
  quantity: number;
  amount_per_qty?: number;
  amount_total_qty?: number;
  purchase_date: Date;
  start_date: string;
  expiry_date: string;
  status_id?: number;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
}

export type order_itemPk = "id";
export type order_itemId = order_item[order_itemPk];
export type order_itemOptionalAttributes = "id" | "user_id" | "order_id" | "license_id" | "amount_per_qty" | "amount_total_qty" | "purchase_date" | "status_id" | "created_at" | "updated_at" | "created_by" | "updated_by";
export type order_itemCreationAttributes = Optional<order_itemAttributes, order_itemOptionalAttributes>;

export class order_item extends Model<order_itemAttributes, order_itemCreationAttributes> implements order_itemAttributes {
  id!: string;
  user_id?: string;
  order_id?: string;
  license_id?: string;
  quantity!: number;
  amount_per_qty?: number;
  amount_total_qty?: number;
  purchase_date!: Date;
  start_date!: string;
  expiry_date!: string;
  status_id?: number;
  created_at!: Date;
  updated_at!: Date;
  created_by?: string;
  updated_by?: string;

  // order_item belongsTo license via license_id
  license!: license;
  getLicense!: Sequelize.BelongsToGetAssociationMixin<license>;
  setLicense!: Sequelize.BelongsToSetAssociationMixin<license, licenseId>;
  createLicense!: Sequelize.BelongsToCreateAssociationMixin<license>;
  // order_item belongsTo master_status via status_id
  status!: master_status;
  getStatus!: Sequelize.BelongsToGetAssociationMixin<master_status>;
  setStatus!: Sequelize.BelongsToSetAssociationMixin<master_status, master_statusId>;
  createStatus!: Sequelize.BelongsToCreateAssociationMixin<master_status>;
  // order_item belongsTo order via order_id
  order!: order;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<order>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<order, orderId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<order>;
  // order_item belongsTo user via created_by
  created_by_user!: user;
  getCreated_by_user!: Sequelize.BelongsToGetAssociationMixin<user>;
  setCreated_by_user!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createCreated_by_user!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // order_item belongsTo user via updated_by
  updated_by_user!: user;
  getUpdated_by_user!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUpdated_by_user!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUpdated_by_user!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // order_item belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof order_item {
    return order_item.init({
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
    order_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    license_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'licenses',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount_per_qty: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    amount_total_qty: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    purchase_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    expiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
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
    tableName: 'order_items',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "order_items_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
