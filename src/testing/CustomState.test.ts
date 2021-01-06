import { State } from '../utils/management/CustomState';

describe('CustomState', () => {
  const sampleBaseData = 20;
  const sampleOkData = 10;
  const errorValue = 'error';
  it('init', () => {
    const myObject = State(sampleBaseData).init();
    expect(myObject.data).toBe(sampleBaseData);
    expect(myObject.pending).toBe(true);
    expect(myObject.error).toBe('');
  });
  it('init-ok', () => {
    const myObject = State(sampleBaseData).init().ok(sampleOkData);
    expect(myObject.data).toBe(sampleOkData);
    expect(myObject.pending).toBe(false);
    expect(myObject.error).toBe('');
  });
  it('init-fail', () => {
    const myObject = State(sampleBaseData).init().fail(errorValue);
    expect(myObject.data).toBe(sampleBaseData);
    expect(myObject.pending).toBe(false);
    expect(myObject.error).toBe(errorValue);
  });
  it('init-ok-fail', () => {
    const myObject = State(sampleBaseData).init().ok(sampleOkData).fail(errorValue);
    expect(myObject.data).toBe(sampleBaseData);
    expect(myObject.pending).toBe(false);
    expect(myObject.error).toBe(errorValue);
  });
  it('init-fail-ok', () => {
    const myObject = State(sampleBaseData).init().fail(errorValue).ok(sampleOkData);
    expect(myObject.data).toBe(sampleOkData);
    expect(myObject.pending).toBe(false);
    expect(myObject.error).toBe('');
  });
  it('ok', () => {
    const myObject = State(sampleBaseData).ok(sampleOkData);
    expect(myObject.data).toBe(sampleOkData);
    expect(myObject.pending).toBe(false);
    expect(myObject.error).toBe('');
  });
  it('ok-init', () => {
    const myObject = State(sampleBaseData).ok(sampleOkData).init();
    expect(myObject.data).toBe(sampleBaseData);
    expect(myObject.pending).toBe(true);
    expect(myObject.error).toBe('');
  });
  it('ok-fail', () => {
    const myObject = State(sampleBaseData).ok(sampleOkData).fail(errorValue);
    expect(myObject.data).toBe(sampleBaseData);
    expect(myObject.pending).toBe(false);
    expect(myObject.error).toBe(errorValue);
  });
  it('ok-fail-init', () => {
    const myObject = State(sampleBaseData).ok(sampleOkData).fail(errorValue).init();
    expect(myObject.data).toBe(sampleBaseData);
    expect(myObject.pending).toBe(true);
    expect(myObject.error).toBe('');
  });
  it('ok-init-fail', () => {
    const myObject = State(sampleBaseData).ok(sampleOkData).init().fail(errorValue);
    expect(myObject.data).toBe(sampleBaseData);
    expect(myObject.pending).toBe(false);
    expect(myObject.error).toBe(errorValue);
  });
  it('fail', () => {
    const myObject = State(sampleBaseData).fail(errorValue);
    expect(myObject.data).toBe(sampleBaseData);
    expect(myObject.pending).toBe(false);
    expect(myObject.error).toBe(errorValue);
  });
  it('fail-ok', () => {
    const myObject = State(sampleBaseData).fail(errorValue).ok(sampleOkData);
    expect(myObject.data).toBe(sampleOkData);
    expect(myObject.pending).toBe(false);
    expect(myObject.error).toBe('');
  });
  it('fail-init', () => {
    const myObject = State(sampleBaseData).fail(errorValue).init();
    expect(myObject.data).toBe(sampleBaseData);
    expect(myObject.pending).toBe(true);
    expect(myObject.error).toBe('');
  });
  it('fail-init-ok', () => {
    const myObject = State(sampleBaseData).fail(errorValue).init().ok(sampleOkData);
    expect(myObject.data).toBe(sampleOkData);
    expect(myObject.pending).toBe(false);
    expect(myObject.error).toBe('');
  });
  it('fail-ok-init', () => {
    const myObject = State(sampleBaseData).fail(errorValue).ok(sampleOkData).init();
    expect(myObject.data).toBe(sampleBaseData);
    expect(myObject.pending).toBe(true);
    expect(myObject.error).toBe('');
  });
});
