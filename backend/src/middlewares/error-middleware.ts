import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error.js";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  //unexpected error
  return res.status(500).json({
    success: false,
    message: "Unexpected Application Error",
  });
};

export { errorMiddleware };
