import { isJSONString } from '..';

describe('isJSONString()', () => {
  it('validates', () => {
    const _INVALID_PROBES_ = ['{', '{"name: otr"}', '}', 's', ''];
    const _VALID_PROBES_ = ['{}', '{"name": "Piotr"}', '{"name": []}'];

    _INVALID_PROBES_.forEach((probe) => {
      expect(isJSONString(probe)).toBe(false);
    });
    _VALID_PROBES_.forEach((probe) => {
      expect(isJSONString(probe)).toBe(true);
    });
  });
});
