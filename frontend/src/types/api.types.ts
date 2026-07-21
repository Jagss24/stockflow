import { IGetRequestAPIParams } from "@/lib/httpMethods";

interface IGetRequestQueryParams extends Omit<IGetRequestAPIParams, "url"> {
  enabled?: boolean;
}

export type { IGetRequestQueryParams };
