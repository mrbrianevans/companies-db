/** Get an environment variable, or throw if its not set */
export function getEnv(name: string): string {
  const value = process.env[name]
  if (value === undefined)
    throw new Error(`${name} environment variable not set`)
  return value
}
export function average<T>(arr: T[], valueGetter = (a: T) => Number(a)) {
  return arr.reduce((avg, current, index) => (index * avg + valueGetter(current)) / (index + 1), 0)
}
