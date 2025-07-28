const API_URL = "https://dummyjson.com/users";
export function buildParamUrl(params = {}) {
  const url = new URL(API_URL);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
}
export function buildFilterParams(filter) {
  if (!filter || !filter.key || !filter.value) {
    return [];
  }
  return [{ key: filter.key, value: filter.value }];
}
export function buildUrlWithFilters(key, value, limit, skip) {
  return `${API_URL}/filter?key=${encodeURIComponent(
    key
  )}&value=${encodeURIComponent(value)}&limit=${limit}&skip=${skip}`;
}
