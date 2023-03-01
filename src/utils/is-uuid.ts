export function isUUID(text: string) {
  const UUIDRegex =
    /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/

  return UUIDRegex.test(text)
}
