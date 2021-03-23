export default function uuidShorten(
  characters: string = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz',
) {
  function encodeIntTo64(int: number) {
    const c: string[] = [];
    while (int > 0) {
      c.unshift(characters[int & 0x3f]);
      int >>>= 6;
    }
    return c.join('');
  }

  function decode64ToInt(base64String: string) {
    const len = base64String.length;
    let int = 0;
    for (let i = 0; i < len; i++) {
      int <<= 6;
      int += characters.indexOf(base64String[i]);
    }
    return int;
  }

  return {
    encode(uuid: string) {
      const stripDashed = uuid.replace(/-/g, '');
      const arr: string[] = [];
      for (let i = 0; i < 8; i++) {
        arr.push(
          encodeIntTo64(
            parseInt(stripDashed.substr(i * 4, 4), 16),
          ).padStart(3, characters[0]),
        );
      }
      return arr.join('');
    },

    decode(shortString: string) {
      const arr: string[] = [];
      for (let i = 0; i < 8; i++) {
        arr.push(
          decode64ToInt(
            shortString.substr(i * 3, 3),
          ).toString(16).padStart(4, '0'),
        );
      }
      const dashed = arr.join('');
      return [
        dashed.substr(0, 8),
        dashed.substr(8, 4),
        dashed.substr(12, 4),
        dashed.substr(16, 4),
        dashed.substr(20),
      ].join('-');
    },

    encodeIntTo64,
    decode64ToInt,
  };
}
