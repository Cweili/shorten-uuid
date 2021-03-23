import shortenUUID from '../src/shorten-uuid.ts';

const { encode, decode } = shortenUUID();

const uuid = '2358e803-12d4-4741-8432-63e9137bd39b';

it('encode', () => {
  expect(encode(uuid)).toBe('1CNDV20AJ3S07Fm5Ed0CvCDQ');
});

it('decode', () => {
  expect(decode(encode(uuid))).toBe(uuid);
});
