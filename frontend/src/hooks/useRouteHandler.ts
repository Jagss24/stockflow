import { useCallback, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import type { NavigateOptions } from "react-router-dom";

type TSearchParamPrimitive = string | number | boolean | null | undefined;
type TSearchParamValue =
  | TSearchParamPrimitive
  | readonly TSearchParamPrimitive[];
type TSearchParamsInput = Record<string, TSearchParamValue>;

type TNavigateToOptions = NavigateOptions & {
  params?: TSearchParamsInput;
  preserveSearchParams?: boolean;
};

const DEFAULT_SEARCH_OPTIONS: NavigateOptions = { replace: true };

const applySearchParams = (
  currentParams: URLSearchParams,
  params: TSearchParamsInput,
) => {
  const nextParams = new URLSearchParams(currentParams);

  Object.entries(params).forEach(([key, value]) => {
    nextParams.delete(key);

    const values = Array.isArray(value) ? value : [value];
    values.forEach((item) => {
      if (item !== null && item !== undefined) {
        nextParams.append(key, String(item));
      }
    });
  });

  return nextParams;
};

const mergeSearchParams = (
  target: URLSearchParams,
  source: URLSearchParams,
) => {
  const keys = new Set(source.keys());

  keys.forEach((key) => {
    target.delete(key);
    source.getAll(key).forEach((value) => target.append(key, value));
  });

  return target;
};

export const useRouteHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, updateSearchParams] = useSearchParams();

  const navigateTo = useCallback(
    (href: string, options: TNavigateToOptions = {}) => {
      const {
        params,
        preserveSearchParams = false,
        ...navigateOptions
      } = options;

      const queryIndex = href.indexOf("?");
      const pathname = queryIndex >= 0 ? href.slice(0, queryIndex) : href;
      const hrefQuery = queryIndex >= 0 ? href.slice(queryIndex + 1) : "";

      let nextParams = preserveSearchParams
        ? new URLSearchParams(searchParams)
        : new URLSearchParams();

      nextParams = mergeSearchParams(
        nextParams,
        new URLSearchParams(hrefQuery),
      );

      if (params) {
        nextParams = applySearchParams(nextParams, params);
      }

      const query = nextParams.toString();
      const destination = `${pathname}${query ? `?${query}` : ""}`;

      navigate(destination, navigateOptions);
    },
    [navigate, searchParams],
  );

  const go = useCallback((delta: number) => navigate(delta), [navigate]);
  const goBack = useCallback(() => navigate(-1), [navigate]);
  const goForward = useCallback(() => navigate(1), [navigate]);

  const getSearchParam = useCallback(
    (key: string, fallback: string | null = null) =>
      searchParams.get(key) ?? fallback,
    [searchParams],
  );

  const getSearchParamValues = useCallback(
    (key: string) => searchParams.getAll(key),
    [searchParams],
  );

  const hasSearchParam = useCallback(
    (key: string) => searchParams.has(key),
    [searchParams],
  );

  const setSearchParams = useCallback(
    (
      params: TSearchParamsInput,
      options: NavigateOptions = DEFAULT_SEARCH_OPTIONS,
    ) => {
      updateSearchParams(
        applySearchParams(new URLSearchParams(), params),
        options,
      );
    },
    [updateSearchParams],
  );

  const addSearchParams = useCallback(
    (
      params: TSearchParamsInput,
      options: NavigateOptions = DEFAULT_SEARCH_OPTIONS,
    ) => {
      updateSearchParams(
        (currentParams) => applySearchParams(currentParams, params),
        options,
      );
    },
    [updateSearchParams],
  );

  const removeSearchParams = useCallback(
    (
      keys: string | readonly string[],
      options: NavigateOptions = DEFAULT_SEARCH_OPTIONS,
    ) => {
      const keysToRemove = Array.isArray(keys) ? keys : [keys];

      updateSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        keysToRemove.forEach((key) => nextParams.delete(key));
        return nextParams;
      }, options);
    },
    [updateSearchParams],
  );

  const clearSearchParams = useCallback(
    (options: NavigateOptions = DEFAULT_SEARCH_OPTIONS) => {
      updateSearchParams(new URLSearchParams(), options);
    },
    [updateSearchParams],
  );

  const searchParamsObject = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams],
  );

  return {
    navigateTo,
    go,
    goBack,
    goForward,
    getSearchParam,
    getSearchParamValues,
    hasSearchParam,
    setSearchParams,
    addSearchParams,
    removeSearchParams,
    clearSearchParams,
    searchParams,
    searchParamsObject,
    location,
    pathname: location.pathname,
    state: location.state,
    currentPath: `${location.pathname}${location.search}`,
  };
};

export type {
  TNavigateToOptions,
  TSearchParamPrimitive,
  TSearchParamsInput,
  TSearchParamValue,
};
