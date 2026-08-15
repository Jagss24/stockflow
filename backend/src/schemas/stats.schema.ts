import { z } from "zod";

const createStatsQuerySchema = <
  const TGroupBy extends readonly [string, ...string[]],
>(
  allowedGroupByFields: TGroupBy,
) =>
  z
    .object({
      groupBy: z.enum(allowedGroupByFields),
    })
    .strict();

export { createStatsQuerySchema };
