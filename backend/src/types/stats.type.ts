type TStatsGroupValue = string | number | boolean | null;

type TStatsGroup<TValue extends TStatsGroupValue> = {
  value: TValue;
  count: number;
};

type TGroupedStats<
  TResource extends string,
  TGroupBy extends string,
  TValue extends TStatsGroupValue,
> = {
  resource: TResource;
  groupBy: TGroupBy;
  total: number;
  groups: TStatsGroup<TValue>[];
};

export type { TGroupedStats, TStatsGroup, TStatsGroupValue };
