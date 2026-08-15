import {
  TGroupedStats,
  TStatsGroup,
  TStatsGroupValue,
} from "../types/stats.type.js";

const createGroupedStats = <
  TResource extends string,
  TGroupBy extends string,
  TValue extends TStatsGroupValue,
>({
  resource,
  groupBy,
  groups,
  expectedValues,
}: {
  resource: TResource;
  groupBy: TGroupBy;
  groups: TStatsGroup<TValue>[];
  expectedValues: readonly TValue[];
}): TGroupedStats<TResource, TGroupBy, TValue> => {
  const counts = new Map(groups.map((group) => [group.value, group.count]));
  const normalizedGroups = expectedValues.map((value) => ({
    value,
    count: counts.get(value) ?? 0,
  }));

  return {
    resource,
    groupBy,
    total: normalizedGroups.reduce((total, group) => total + group.count, 0),
    groups: normalizedGroups,
  };
};

export { createGroupedStats };
