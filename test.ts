import assert from 'node:assert'
import test from 'node:test'
import { cfp } from './index.js'

test('cfp initialized without args', async () => {
  await assert.rejects(async () => (cfp as any)(), new Error('cfp initialized without functions'))
})

test('basic', async () => {
  const positiveNumbers = ({ numbers }: { numbers: number[] }) => numbers.filter(n => n > 0)
  const stringPostfix = () => 'postfix'
  const positiveNumbersAsString = cfp(positiveNumbers, stringPostfix, (ns, postfix) => `${ns.toString()} ${postfix}`)
  assert.strictEqual(positiveNumbersAsString({ numbers: [-1, -5, 7, 0, 4] }), '7,4 postfix')
})

test('raw', async () => {
  const positiveNumbers = ({ numbers }: { numbers: number[] }) => numbers.filter(n => n > 0)
  const stringPostfix = () => 'postfix'
  const positiveNumbersAsString = cfp(positiveNumbers, stringPostfix, (ns, postfix) => `${ns.toString()} ${postfix}`)
  assert.strictEqual(positiveNumbersAsString.raw([7, 4], 'postfix'), '7,4 postfix')
})

test('cache', async () => {
  let called = 0
  const positiveNumbers = ({ numbers }: { numbers: number[] }) => (called++, numbers.filter(n => n > 0))
  const positiveNumbersLength = cfp(positiveNumbers, ns => ns.length)
  const positiveNumbersAsString = cfp(
    positiveNumbers,
    positiveNumbersLength,
    (ns, l) => `${ns.toString()}; length - ${l}`
  )
  assert.strictEqual(positiveNumbersAsString({ numbers: [-1, -5, 7, 0, 4] }), '7,4; length - 2')
  assert.strictEqual(called, 1)
})

test('di', async () => {
  const fetchUserFromDB = async (): Promise<{ name: string }> => {
    throw new Error('should not call')
  }

  const fetchUser = ({ mockFetchUser }: { mockFetchUser?: typeof fetchUserFromDB }) =>
    mockFetchUser?.() ?? fetchUserFromDB()

  const helloWorldUser = cfp(fetchUser, user => user.then(({ name }) => `Hello world, ${name}!`))

  assert.strictEqual(await helloWorldUser({ mockFetchUser: async () => ({ name: 'Vasya' }) }), 'Hello world, Vasya!')
})

test('generics 1', () => {
  const fn1 = ({ ctx }: { ctx: number }) => ({ a: ctx })
  const fn = cfp(fn1, ({ a }) => a + 1)
  assert.strictEqual(fn({ ctx: 1 }), 2)
})

test('generics 2', () => {
  const fn1 = ({ ctx }: { ctx: number }) => ({ a: ctx })
  const fn2 = ({ ctx }: { ctx: number }) => ({ b: ctx })
  const fn = cfp(fn1, fn2, ({ a }, { b }) => a + b + 1)
  assert.strictEqual(fn({ ctx: 1 }), 3)
})

test('generics 3', () => {
  const fn1 = ({ ctx }: { ctx: number }) => ({ a: ctx })
  const fn2 = ({ ctx }: { ctx: number }) => ({ b: ctx })
  const fn3 = ({ ctx }: { ctx: number }) => ({ c: ctx })
  const fn = cfp(fn1, fn2, fn3, ({ a }, { b }, { c }) => a + b + c + 1)
  assert.strictEqual(fn({ ctx: 1 }), 4)
})

test('generics 4', () => {
  const fn1 = ({ ctx }: { ctx: number }) => ({ a: ctx })
  const fn2 = ({ ctx }: { ctx: number }) => ({ b: ctx })
  const fn3 = ({ ctx }: { ctx: number }) => ({ c: ctx })
  const fn4 = ({ ctx }: { ctx: number }) => ({ d: ctx })
  const fn = cfp(fn1, fn2, fn3, fn4, ({ a }, { b }, { c }, { d }) => a + b + c + d + 1)
  assert.strictEqual(fn({ ctx: 1 }), 5)
})

test('generics 5', () => {
  const fn1 = ({ ctx }: { ctx: number }) => ({ a: ctx })
  const fn2 = ({ ctx }: { ctx: number }) => ({ b: ctx })
  const fn3 = ({ ctx }: { ctx: number }) => ({ c: ctx })
  const fn4 = ({ ctx }: { ctx: number }) => ({ d: ctx })
  const fn5 = ({ ctx }: { ctx: number }) => ({ e: ctx })
  const fn = cfp(fn1, fn2, fn3, fn4, fn5, ({ a }, { b }, { c }, { d }, { e }) => a + b + c + d + e + 1)
  assert.strictEqual(fn({ ctx: 1 }), 6)
})

test('generics 6', () => {
  const fn1 = ({ ctx }: { ctx: number }) => ({ a: ctx })
  const fn2 = ({ ctx }: { ctx: number }) => ({ b: ctx })
  const fn3 = ({ ctx }: { ctx: number }) => ({ c: ctx })
  const fn4 = ({ ctx }: { ctx: number }) => ({ d: ctx })
  const fn5 = ({ ctx }: { ctx: number }) => ({ e: ctx })
  const fn6 = ({ ctx }: { ctx: number }) => ({ f: ctx })
  const fn = cfp(fn1, fn2, fn3, fn4, fn5, fn6, ({ a }, { b }, { c }, { d }, { e }, { f }) => a + b + c + d + e + f + 1)
  assert.strictEqual(fn({ ctx: 1 }), 7)
})

test('generics 7', () => {
  const fn1 = ({ ctx }: { ctx: number }) => ({ a: ctx })
  const fn2 = ({ ctx }: { ctx: number }) => ({ b: ctx })
  const fn3 = ({ ctx }: { ctx: number }) => ({ c: ctx })
  const fn4 = ({ ctx }: { ctx: number }) => ({ d: ctx })
  const fn5 = ({ ctx }: { ctx: number }) => ({ e: ctx })
  const fn6 = ({ ctx }: { ctx: number }) => ({ f: ctx })
  const fn7 = ({ ctx }: { ctx: number }) => ({ g: ctx })
  const fn = cfp(
    fn1,
    fn2,
    fn3,
    fn4,
    fn5,
    fn6,
    fn7,
    ({ a }, { b }, { c }, { d }, { e }, { f }, { g }) => a + b + c + d + e + f + g + 1
  )
  assert.strictEqual(fn({ ctx: 1 }), 8)
})

test('generics 8', () => {
  const fn1 = ({ ctx }: { ctx: number }) => ({ a: ctx })
  const fn2 = ({ ctx }: { ctx: number }) => ({ b: ctx })
  const fn3 = ({ ctx }: { ctx: number }) => ({ c: ctx })
  const fn4 = ({ ctx }: { ctx: number }) => ({ d: ctx })
  const fn5 = ({ ctx }: { ctx: number }) => ({ e: ctx })
  const fn6 = ({ ctx }: { ctx: number }) => ({ f: ctx })
  const fn7 = ({ ctx }: { ctx: number }) => ({ g: ctx })
  const fn8 = ({ ctx }: { ctx: number }) => ({ h: ctx })
  const fn = cfp(
    fn1,
    fn2,
    fn3,
    fn4,
    fn5,
    fn6,
    fn7,
    fn8,
    ({ a }, { b }, { c }, { d }, { e }, { f }, { g }, { h }) => a + b + c + d + e + f + g + h + 1
  )
  assert.strictEqual(fn({ ctx: 1 }), 9)
})

test('generics 9', () => {
  const fn1 = ({ ctx }: { ctx: number }) => ({ a: ctx })
  const fn2 = ({ ctx }: { ctx: number }) => ({ b: ctx })
  const fn3 = ({ ctx }: { ctx: number }) => ({ c: ctx })
  const fn4 = ({ ctx }: { ctx: number }) => ({ d: ctx })
  const fn5 = ({ ctx }: { ctx: number }) => ({ e: ctx })
  const fn6 = ({ ctx }: { ctx: number }) => ({ f: ctx })
  const fn7 = ({ ctx }: { ctx: number }) => ({ g: ctx })
  const fn8 = ({ ctx }: { ctx: number }) => ({ h: ctx })
  const fn9 = ({ ctx }: { ctx: number }) => ({ i: ctx })
  const fn = cfp(
    fn1,
    fn2,
    fn3,
    fn4,
    fn5,
    fn6,
    fn7,
    fn8,
    fn9,
    ({ a }, { b }, { c }, { d }, { e }, { f }, { g }, { h }, { i }) => a + b + c + d + e + f + g + h + i + 1
  )
  assert.strictEqual(fn({ ctx: 1 }), 10)
})

test('generics 10', () => {
  const fn1 = ({ ctx }: { ctx: number }) => ({ a: ctx })
  const fn2 = ({ ctx }: { ctx: number }) => ({ b: ctx })
  const fn3 = ({ ctx }: { ctx: number }) => ({ c: ctx })
  const fn4 = ({ ctx }: { ctx: number }) => ({ d: ctx })
  const fn5 = ({ ctx }: { ctx: number }) => ({ e: ctx })
  const fn6 = ({ ctx }: { ctx: number }) => ({ f: ctx })
  const fn7 = ({ ctx }: { ctx: number }) => ({ g: ctx })
  const fn8 = ({ ctx }: { ctx: number }) => ({ h: ctx })
  const fn9 = ({ ctx }: { ctx: number }) => ({ i: ctx })
  const fn10 = ({ ctx }: { ctx: number }) => ({ j: ctx })
  const fn = cfp(
    fn1,
    fn2,
    fn3,
    fn4,
    fn5,
    fn6,
    fn7,
    fn8,
    fn9,
    fn10,
    ({ a }, { b }, { c }, { d }, { e }, { f }, { g }, { h }, { i }, { j }) => a + b + c + d + e + f + g + h + i + j + 1
  )
  assert.strictEqual(fn({ ctx: 1 }), 11)
})

test('context is object', async () => {
  let err: Error
  const incNumber = (number: number) => number + 1
  const stringPostfix = () => 'postfix'
  // @ts-expect-error
  const positiveNumbersAsString = cfp(incNumber, stringPostfix, (ns, postfix) => `${ns.toString()} ${postfix}`)
  try {
    // @ts-expect-error
    positiveNumbersAsString(1)
  } catch (e: unknown) {
    err = e as Error
  }
  assert.equal(err!.message, 'Invalid value used as weak map key')
})
