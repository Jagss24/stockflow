import { Warehouse } from "../generated/prisma/client.js";
import { TParsedListQuery } from "./api-query.type.js";

type TCreateWarehouseData = Pick<
  Warehouse,
  "name" | "code" | "address" | "city" | "state" | "isActive"
>;

type TUpdateWarehouseData = Partial<TCreateWarehouseData>;

type TWarehouseFilterKey = "name" | "code" | "city" | "state" | "isActive";
type TWarehouseIncludeKey = never;
type TWarehouseListQuery = TParsedListQuery<
  TWarehouseFilterKey,
  TWarehouseIncludeKey
>;

export type {
  Warehouse as TWarehouse,
  TCreateWarehouseData,
  TUpdateWarehouseData,
  TWarehouseFilterKey,
  TWarehouseIncludeKey,
  TWarehouseListQuery,
};
