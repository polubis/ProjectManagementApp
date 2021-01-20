import { isRefType } from "..";

describe('isRefType()', () => {
    it('validates', () => {
      const _INVALID_PROBES_ = ['null', '17', '}', ''];
      const _VALID_PROBES_ = ['{}', '{name: "Piotr"}', '[1]'];
  
      _INVALID_PROBES_.forEach((probe) => {
        expect(isRefType(probe)).toBe(false);
      });
      _VALID_PROBES_.forEach((probe) => {
        expect(isRefType(probe)).toBe(true);
      });
    });
  });