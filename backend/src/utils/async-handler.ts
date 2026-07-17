import { NextFunction, Request, Response } from "express";

const asyncHandler = <TBody = any>(
  cb: (
    req: Request<any, any, TBody, any>,
    res: Response,
    next: NextFunction,
  ) => Promise<any>,
) => {
  return (
    req: Request<any, any, TBody, any>,
    res: Response,
    next: NextFunction,
  ) => {
    cb(req, res, next).catch(next);
  };
};

export { asyncHandler };
