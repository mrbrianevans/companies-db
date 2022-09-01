

interface SignalOptions{
  signal?: AbortSignal
}
interface ConcurrencyOptions{
  concurrency?: number
}
declare module 'stream' {
  interface Readable {
    map<T>(fn: (data: any, options?: SignalOptions) => T|Promise<T>, options?: SignalOptions & ConcurrencyOptions): Readable
    filter(fn: (data: any, options?: SignalOptions) => boolean|Promise<boolean>, options?: SignalOptions & ConcurrencyOptions): Readable
    forEach(fn: (data: any, options?: SignalOptions) => void|Promise<void>, options?: SignalOptions & ConcurrencyOptions): Promise<void>
    toArray(options?: SignalOptions): Promise<any[]>
    some(fn: (data: any, options?: SignalOptions) => boolean|Promise<boolean>, options?: SignalOptions & ConcurrencyOptions): Promise<boolean>
    find(fn: (data: any, options?: SignalOptions) => boolean|Promise<boolean>, options?: SignalOptions & ConcurrencyOptions): Promise<any|undefined>
    every(fn: (data: any, options?: SignalOptions) => boolean|Promise<boolean>, options?: SignalOptions & ConcurrencyOptions): Promise<boolean>
    flatMap<T>(fn: (data: any, options?: SignalOptions) => T|Promise<T>, options?: SignalOptions & ConcurrencyOptions): Readable
    drop(limit: number, options?: SignalOptions): Readable
    take(limit: number, options?: SignalOptions): Readable
    asIndexedPairs(options?: SignalOptions): Readable
    reduce<T>(fn: (previous:any, data:any, options?: SignalOptions)=>T|Promise<T>, initial?: T, options?: SignalOptions): Promise<T>
  }
}

export {}
