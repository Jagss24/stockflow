import { ParsedQs } from "qs";
import { ValidationError } from "../errors/app-error.js";
import {
  TListQueryConfig,
  TParsedListQuery,
  TPaginationMeta,
} from "../types/api-query.type.js";

type TRawQueryValue = string | ParsedQs | (string | ParsedQs)[] | undefined;

const getSingleQueryValue = (value: TRawQueryValue) => {
  if (Array.isArray(value)) {
    return typeof value[0] === "string" ? value[0] : undefined;
  }

  return typeof value === "string" ? value : undefined;
};

const parsePositiveInteger = ({
  value,
  field,
  defaultValue,
  max,
}: {
  value: TRawQueryValue;
  field: string;
  defaultValue: number;
  max?: number;
}) => {
  const rawValue = getSingleQueryValue(value);

  if (!rawValue) {
    return defaultValue;
  }

  const parsedValue = Number(rawValue);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new ValidationError("Validation failed", [
      {
        field,
        message: `${field} must be a positive integer`,
      },
    ]);
  }

  if (max && parsedValue > max) {
    throw new ValidationError("Validation failed", [
      {
        field,
        message: `${field} cannot be greater than ${max}`,
      },
    ]);
  }

  return parsedValue;
};

const parseIncludes = <TIncludeKey extends string>({
  value,
  allowedIncludes,
}: {
  value: TRawQueryValue;
  allowedIncludes: readonly TIncludeKey[];
}) => {
  const includeValue = getSingleQueryValue(value);

  if (!includeValue) {
    return [] as TIncludeKey[];
  }

  const includes = includeValue
    .split(",")
    .map((include) => include.trim())
    .filter(Boolean);

  const invalidIncludes = includes.filter(
    (include) => !allowedIncludes.includes(include as TIncludeKey),
  );

  if (invalidIncludes.length > 0) {
    throw new ValidationError("Invalid includes", [
      {
        field: "include",
        message: `Include '${invalidIncludes.join(
          ", ",
        )}' are not allowed. Allowed includes: ${
          allowedIncludes.length ? allowedIncludes.join(", ") : "none"
        }`,
      },
    ]);
  }

  return includes as TIncludeKey[];
};

const parseFilters = <TFilterKey extends string>({
  value,
  allowedFilters,
}: {
  value: TRawQueryValue;
  allowedFilters: readonly TFilterKey[];
}) => {
  if (!value) {
    return {};
  }

  if (typeof value !== "object" || Array.isArray(value)) {
    throw new ValidationError("Invalid filters", [
      {
        field: "filter",
        message: "filter must be an object",
      },
    ]);
  }

  const filters: Partial<Record<TFilterKey, string>> = {};
  const filterEntries = Object.entries(value);
  const invalidFilters = filterEntries
    .map(([key]) => key)
    .filter((key) => !allowedFilters.includes(key as TFilterKey));

  if (invalidFilters.length > 0) {
    throw new ValidationError("Invalid filters", [
      {
        field: "filter",
        message: `Filter '${invalidFilters.join(
          ", ",
        )}' are not allowed. Allowed filters: ${
          allowedFilters.length ? allowedFilters.join(", ") : "none"
        }`,
      },
    ]);
  }

  filterEntries.forEach(([key, rawValue]) => {
    const filterValue = getSingleQueryValue(rawValue);

    if (filterValue !== undefined && filterValue.trim() !== "") {
      filters[key as TFilterKey] = filterValue.trim();
    }
  });

  return filters;
};

const parseListQuery = <
  TFilterKey extends string,
  TIncludeKey extends string = never,
>({
  query,
  config,
}: {
  query: ParsedQs;
  config: TListQueryConfig<TFilterKey, TIncludeKey>;
}): TParsedListQuery<TFilterKey, TIncludeKey> => {
  const page = parsePositiveInteger({
    value: query.page,
    field: "page",
    defaultValue: config.defaultPage ?? 1,
  });
  const limit = parsePositiveInteger({
    value: query.limit,
    field: "limit",
    defaultValue: config.defaultLimit ?? 10,
    max: config.maxLimit ?? 100,
  });
  const search = getSingleQueryValue(query.search)?.trim();
  const includes = parseIncludes({
    value: query.include,
    allowedIncludes: config.allowedIncludes,
  });
  const filters = parseFilters({
    value: query.filter,
    allowedFilters: config.allowedFilters,
  });

  return {
    page,
    limit,
    search: search || undefined,
    filters,
    includes,
  };
};

const createPaginationMeta = ({
  page,
  limit,
  total,
}: {
  page: number;
  limit: number;
  total: number;
}): TPaginationMeta => {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};

export { parseListQuery, createPaginationMeta };
