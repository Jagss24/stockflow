import { Warehouse } from "../generated/prisma/client.js";

type TCreateWarehouseData = Pick<
  Warehouse,
  "name" | "code" | "address" | "city" | "state" | "isActive"
>;

type TUpdateWarehouseData = Partial<TCreateWarehouseData>;

export type {
  Warehouse as TWarehouse,
  TCreateWarehouseData,
  TUpdateWarehouseData,
};
