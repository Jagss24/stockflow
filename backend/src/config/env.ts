import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive(),
  JWT_SECRET_KEY: z.string().trim().min(1, "JWT_SECRET_KEY is required"),
  FRONTEND_ORIGIN: z.url("FRONTEND_ORIGIN must be a valid URL"),
  DATABASE_URL: z.string().trim().min(1, "Database URL not provided"),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment variables:");
  console.error(z.treeifyError(result.error));
  process.exit(1);
}

export const env = result.data;
