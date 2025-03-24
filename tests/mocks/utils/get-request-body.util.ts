export const getRequestBody = async <T>(request: Request): Promise<T> => {
  if (request.headers.get('Content-Type').includes('application/json')) {
    return (await request.json()) as T
  }

  const formData = await request.formData()

  return formData.entries().reduce(
    (json, [key, value]) => ({
      ...json,
      [key]: value,
    }),
    {} as T,
  )
}
