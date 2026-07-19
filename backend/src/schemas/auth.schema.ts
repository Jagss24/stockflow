import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min(1, "Name is required"),
  email: z
    .string({ error: "Email is required" })
    .trim()
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z
    .string({ error: "Email id is required" })
    .trim()
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

type TRegisterBody = z.infer<typeof registerSchema>;
type TLoginBody = z.infer<typeof loginSchema>;

export { registerSchema, loginSchema };
export type { TRegisterBody, TLoginBody };
