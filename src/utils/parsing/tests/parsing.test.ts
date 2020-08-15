import { isJSONString } from '..';

describe('isJSONString', () => {
  it('returns true for valid string', () => {
    const _PROBES_ = ['{}', '{"name": "Piotr"}', '{"name": []}'];

    _PROBES_.forEach((probe) => {
      expect(isJSONString(probe)).toBe(true);
    });
  });

  it('returns false for invalid string', () => {
    const _PROBES_ = ['{', '{"name: otr"}', '}', 's', ''];

    _PROBES_.forEach((probe) => {
      expect(isJSONString(probe)).toBe(false);
    });
  });
});
