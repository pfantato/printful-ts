export const arrayToQueryString = (values: unknown[]) =>
  values.length === 1 ? `${values[0]}` : values.join(',')
