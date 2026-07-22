import { Category } from "../generated/prisma/client.js";
import { TParsedListQuery } from "./api-query.type.js";

type TCreateCategoryData = Pick<
  Category,
  "name" | "description" | "isActive"
>;

type TUpdateCategoryData = Partial<TCreateCategoryData>;

type TCategoryFilterKey = "name" | "description" | "isActive";
type TCategoryIncludeKey = never;
type TCategoryListQuery = TParsedListQuery<
  TCategoryFilterKey,
  TCategoryIncludeKey
>;

export type {
  Category as TCategory,
  TCreateCategoryData,
  TUpdateCategoryData,
  TCategoryFilterKey,
  TCategoryIncludeKey,
  TCategoryListQuery,
};
