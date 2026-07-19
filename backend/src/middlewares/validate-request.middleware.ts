import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ValidationError } from "../errors/app-error.js";

const validateRequest = (schema: z.ZodType) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(new ValidationError("Validation failed", errors));
    }

    req.body = result.data;
    return next();
  };
};

export { validateRequest };
