import test from 'node:test'
import assert from 'node:assert/strict'
import shortenUuid from '../src/shorten-uuid.ts'

const { encode, decode } = shortenUuid()

const uuid = '2358e803-12d4-4741-8432-63e9137bd39b'

test('encode', () => {
  assert.equal(encode(uuid), '1CNDV20AJ3S07Fm5Ed0CvCDQ')
})

test('decode', () => {
  assert.equal(decode(encode(uuid)), uuid)
})

test('encodeIntTo64 / decode64ToInt - boundaries and roundtrip', () => {
  const { encodeIntTo64, decode64ToInt } = shortenUuid()

  assert.equal(encodeIntTo64(0), '')
  assert.equal(encodeIntTo64(-1), '')
  assert.equal(decode64ToInt(''), 0)

  const samples = [1, 2, 63, 64, 65, 123456]
  // eslint-disable-next-line no-restricted-syntax
  for (const n of samples) {
    const encoded = encodeIntTo64(n)
    assert.ok(encoded.length > 0)
    assert.equal(decode64ToInt(encoded), n)
  }
})

test('decode64ToInt - ASCII fast path and non-ASCII input fallback to Map', () => {
  const { decode64ToInt } = shortenUuid()

  // 默认字符集全是 ASCII，走 Int16Array 快查路径
  assert.equal(decode64ToInt('-'), 0)
  assert.equal(decode64ToInt('0'), 1)

  // 但输入字符可以是非 ASCII；此时 code < 128 为 false，会回退到 Map，并返回 -1
  assert.equal(decode64ToInt('é'), -1)
})

test('initialization - duplicate characters cover has/ASCII table branches', () => {
  const { decode64ToInt } = shortenUuid('aa')

  // 'a' 被记录为 index 0（第二个重复不会覆盖）
  assert.equal(decode64ToInt('a'), 0)
})

test('initialization - non-ASCII characters disable ASCII fast lookup', () => {
  const customCharacters = 'é-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'
  const { decode64ToInt } = shortenUuid(customCharacters)

  // 由于字符集里出现了非 ASCII，indexOfChar 会走 Map 分支
  assert.equal(decode64ToInt('-'), 1)
  assert.equal(decode64ToInt('0'), 2)

  // 不存在的字符 -> Map.get 为 undefined -> -1
  assert.equal(decode64ToInt('$'), -1)
})

test('initialization - non-string (array-like) input triggers ch.length !== 1', () => {
  // TypeScript 类型是 string，但运行时可以传入 array-like，触发 ch.length !== 1 分支（覆盖 line 18）
  const instance = shortenUuid(['ab', 'c'] as unknown as string)
  assert.equal(typeof instance.encode, 'function')
  assert.equal(typeof instance.decode, 'function')
})
