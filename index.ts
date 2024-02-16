const cache = new WeakMap<object, Map<() => unknown, unknown>>()

export function cfp<C extends object, T1, R>(
  dep1: (ctx: C) => T1,
  fn: (x1: T1) => R
): ((ctx: C) => R) & { raw: (x1: T1) => R }
export function cfp<C extends object, T1, T2, R>(
  dep1: (ctx: C) => T1,
  dep2: (ctx: C) => T2,
  fn: (x1: T1, x2: T2) => R
): ((ctx: C) => R) & { raw: (x1: T1, x2: T2) => R }
export function cfp<C extends object, T1, T2, T3, R>(
  dep1: (ctx: C) => T1,
  dep2: (ctx: C) => T2,
  dep3: (ctx: C) => T3,
  fn: (x1: T1, x2: T2, x3: T3) => R
): ((ctx: C) => R) & { raw: (x1: T1, x2: T2, x3: T3) => R }
export function cfp<C extends object, T1, T2, T3, T4, R>(
  dep1: (ctx: C) => T1,
  dep2: (ctx: C) => T2,
  dep3: (ctx: C) => T3,
  dep4: (ctx: C) => T4,
  fn: (x1: T1, x2: T2, x3: T3, x4: T4) => R
): ((ctx: C) => R) & { raw: (x1: T1, x2: T2, x3: T3, x4: T4) => R }
export function cfp<C extends object, T1, T2, T3, T4, T5, R>(
  dep1: (ctx: C) => T1,
  dep2: (ctx: C) => T2,
  dep3: (ctx: C) => T3,
  dep4: (ctx: C) => T4,
  dep5: (ctx: C) => T5,
  fn: (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5) => R
): ((ctx: C) => R) & { raw: (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5) => R }
export function cfp<C extends object, T1, T2, T3, T4, T5, T6, R>(
  dep1: (ctx: C) => T1,
  dep2: (ctx: C) => T2,
  dep3: (ctx: C) => T3,
  dep4: (ctx: C) => T4,
  dep5: (ctx: C) => T5,
  dep6: (ctx: C) => T6,
  fn: (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5, x6: T6) => R
): ((ctx: C) => R) & { raw: (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5, x6: T6) => R }
export function cfp<C extends object, T1, T2, T3, T4, T5, T6, T7, R>(
  dep1: (ctx: C) => T1,
  dep2: (ctx: C) => T2,
  dep3: (ctx: C) => T3,
  dep4: (ctx: C) => T4,
  dep5: (ctx: C) => T5,
  dep6: (ctx: C) => T6,
  dep7: (ctx: C) => T7,
  fn: (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5, x6: T6, x7: T7) => R
): ((ctx: C) => R) & { raw: (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5, x6: T6, x7: T7) => R }
export function cfp<C extends object, T1, T2, T3, T4, T5, T6, T7, T8, R>(
  dep1: (ctx: C) => T1,
  dep2: (ctx: C) => T2,
  dep3: (ctx: C) => T3,
  dep4: (ctx: C) => T4,
  dep5: (ctx: C) => T5,
  dep6: (ctx: C) => T6,
  dep7: (ctx: C) => T7,
  dep8: (ctx: C) => T8,
  fn: (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5, x6: T6, x7: T7, x8: T8) => R
): ((ctx: C) => R) & { raw: (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5, x6: T6, x7: T7, x8: T8) => R }
export function cfp<C extends object, T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(
  dep1: (ctx: C) => T1,
  dep2: (ctx: C) => T2,
  dep3: (ctx: C) => T3,
  dep4: (ctx: C) => T4,
  dep5: (ctx: C) => T5,
  dep6: (ctx: C) => T6,
  dep7: (ctx: C) => T7,
  dep8: (ctx: C) => T8,
  dep9: (ctx: C) => T9,
  fn: (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5, x6: T6, x7: T7, x8: T8, x9: T9) => R
): ((ctx: C) => R) & { raw: (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5, x6: T6, x7: T7, x8: T8, x9: T9) => R }
export function cfp<C extends object, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, R>(
  dep1: (ctx: C) => T1,
  dep2: (ctx: C) => T2,
  dep3: (ctx: C) => T3,
  dep4: (ctx: C) => T4,
  dep5: (ctx: C) => T5,
  dep6: (ctx: C) => T6,
  dep7: (ctx: C) => T7,
  dep8: (ctx: C) => T8,
  dep9: (ctx: C) => T9,
  dep10: (ctx: C) => T10,
  fn: (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5, x6: T6, x7: T7, x8: T8, x9: T9, x10: T10) => R
): ((ctx: C) => R) & { raw: (x1: T1, x2: T2, x3: T3, x4: T4, x5: T5, x6: T6, x7: T7, x8: T8, x9: T9, x10: T10) => R }
export function cfp(...fns: ((...args: unknown[]) => unknown)[]) {
  if (!fns.length) {
    throw new Error('cfp initialized without functions')
  }
  const raw = fns.at(-1)!
  const deps = fns.slice(0, -1)
  return Object.assign(
    (context: object) => {
      const contextCache = cache.get(context) ?? cache.set(context, new Map()).get(context)!
      return raw(
        ...deps.map(f => {
          if (contextCache.has(f)) {
            return contextCache.get(f)
          }
          const resp = f(context)
          contextCache.set(f, resp)
          return resp
        })
      )
    },
    { raw }
  )
}

export const sfp = <T, S>(fn: (state: S, payload: T) => S, init: S): ((payload?: T) => S) => {
  let state: S = init
  return (payload?: T) => {
    if (payload === void 0) {
      return state
    }
    return (state = fn(state, payload))
  }
}
