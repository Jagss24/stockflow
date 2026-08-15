import { Request } from "express";

const getValidatedQuery = <TQuery>(req: Request) => {
  return req.validatedQuery as TQuery;
};

export { getValidatedQuery };
