interface ICurrentUserResponseSchema {
  id: number;
  email: string;
  name: string;
  role: "OWNER" | "ADMIN" | "SALES_MANAGER" | "INVENTORY_MANAGER";
  created_at: string;
  updated_at: string;
}

export type { ICurrentUserResponseSchema };
