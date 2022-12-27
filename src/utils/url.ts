export const setQueryParams = (params: Record<string, string>) => {
  const url = new URL(location.href);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  history.pushState(null, "", url);
};
