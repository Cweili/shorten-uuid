export default function uuidShorten(
  characters: string = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz',
) {
  const charToIndex = new Map<string, number>()
  const charToIndexAscii = new Int16Array(128)
  charToIndexAscii.fill(-1)
  let canUseAsciiLookup = true

  for (let i = 0; i < characters.length; i++) {
    const ch = characters[i]

    if (!charToIndex.has(ch)) {
      charToIndex.set(ch, i)
    }

    if (canUseAsciiLookup) {
      if (ch.length !== 1) {
        canUseAsciiLookup = false
      } else {
        const code = ch.charCodeAt(0)
        if (code >= 128) {
          canUseAsciiLookup = false
        } else if (charToIndexAscii[code] === -1) {
          charToIndexAscii[code] = i
        }
      }
    }
  }

  function indexOfChar(ch: string) {
    if (canUseAsciiLookup && ch.length === 1) {
      const code = ch.charCodeAt(0)
      if (code < 128) {
        return charToIndexAscii[code]
      }
    }

    const v = charToIndex.get(ch)
    return v === undefined ? -1 : v
  }

  function encodeIntTo64(int: number) {
    if (int <= 0) return ''

    let out = ''
    while (int > 0) {
      out = characters[int & 0x3f] + out
      int >>>= 6
    }
    return out
  }

  function decode64ToInt(base64String: string) {
    const len = base64String.length
    let int = 0
    for (let i = 0; i < len; i++) {
      int <<= 6
      int += indexOfChar(base64String[i])
    }
    return int
  }

  function encodeUint16To64Fixed3(int: number) {
    const v = int >>> 0
    return (
      characters[(v >>> 12) & 0x3f]
      + characters[(v >>> 6) & 0x3f]
      + characters[v & 0x3f]
    )
  }

  function decode64Fixed3ToUint16(base64String3: string) {
    const a = indexOfChar(base64String3[0])
    const b = indexOfChar(base64String3[1])
    const c = indexOfChar(base64String3[2])
    return (a << 12) | (b << 6) | c
  }

  return {
    encode(uuid: string) {
      const stripDashed = uuid.replace(/-/g, '')
      let out = ''
      for (let i = 0; i < 8; i++) {
        out += encodeUint16To64Fixed3(
          parseInt(stripDashed.substr(i * 4, 4), 16),
        )
      }
      return out
    },

    decode(shortString: string) {
      let out = ''
      for (let i = 0; i < 8; i++) {
        if (i > 1 && i < 6) {
          out += '-'
        }
        out += decode64Fixed3ToUint16(
          shortString.substr(i * 3, 3),
        ).toString(16).padStart(4, '0')
      }
      return out
    },

    encodeIntTo64,
    decode64ToInt,
  }
}
