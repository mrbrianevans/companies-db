/** Get an environment variable, or throw if its not set */
export function getEnv(name: string): string {
  const value = process.env[name]
  if (value === undefined)
    throw new Error(`${name} environment variable not set`)
  return value
}

// calculate the average value in an array
export function average<T extends number>(arr: T[]): number
export function average<T>(arr: T[], valueGetter: (val: T) => number): number
export function average<T>(
  arr: { reduce(fn: () => number, initial: number): Promise<number> },
  valueGetter: (val: T) => number
): Promise<number>
export function average<T>(arr, valueGetter = (a) => Number(a)) {
  return arr.reduce((avg, current, index) => (index * avg + valueGetter(current)) / (index + 1), 0)
}
