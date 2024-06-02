import { Model, ModelObject } from "objection";
import { OrdersModel } from "./order";
import { UsersModel } from "./users";

export class CarsModel extends Model {
  id?: number;
  name!: string;
  category!: string;
  price!: number;
  color!: string;
  year!: number;
  image!: string;
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date;
  created_by!: string;
  updated_by!: string;
  deleted_by?: string;

  static get tableName() {
    return "cars";
  }
  static get relationMappings() {
    return {
      // orders: {
      //   relation: Model.HasManyRelation,
      //   modelClass: OrdersModel,
      //   join: {
      //     from: "orders.car_id",
      //     to: "cars.id",
      //   },
      // },
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: "users.id",
          to: "cars.created_by",
        },
      },
    };
  }
}

export type Articles = ModelObject<CarsModel>;
