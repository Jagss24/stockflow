import { Request } from "express";

const getValidatedParams = <TParams>(req: Request) => {
  return req.validatedParams as TParams;
};

export { getValidatedParams };
