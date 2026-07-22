import { NextFunction, Request, Response } from "express";

const asyncHandler = <TBody = any, TParams = any>(
  cb: (
    req: Request<TParams, any, TBody, any>,
    res: Response,
    next: NextFunction,
  ) => Promise<any>,
) => {
  return (
    req: Request<TParams, any, TBody, any>,
    res: Response,
    next: NextFunction,
  ) => {
    cb(req, res, next).catch(next);
  };
};

export { asyncHandler };
