import { State, Stateable } from '../State';

describe('State', () => {
  interface User {
    id: number;
    name: string;
  }

  const USER: User = { id: 0, name: 'Tom' };
  const ERROR = 'Error';

  it('builds init state', () => {
    const testInit = <T, R>(state: Stateable<T>, data: R): void => {
      expect(state.data).toBe(data);
      expect(state.error).toBe('');
      expect(state.pending).toBe(true);
    };

    testInit(State<User>(), null);
    testInit(State<User>(null), null);
    testInit(State<User>(undefined), null);
    testInit(State<User>(USER), USER);
  });

  describe('init()', () => {
    it('resets state after ok', () => {
      let state = State<User>().ok(USER);

      expect(state.data).toEqual(USER);
      expect(state.error).toBe('');
      expect(state.pending).toBe(false);

      state = state.init();

      expect(state.data).toBe(null);
      expect(state.error).toBe('');
      expect(state.pending).toBe(true);
    });

    it('resets state after fail', () => {
      let state = State<User>().fail(ERROR);

      expect(state.data).toBe(null);
      expect(state.error).toBe(ERROR);
      expect(state.pending).toBe(false);

      state = state.init();

      expect(state.data).toBe(null);
      expect(state.error).toBe('');
      expect(state.pending).toBe(true);
    });
  });

  describe('ok()', () => {
    it('assigns data', () => {
      const state = State<User>();

      expect(state.data).toBe(null);
      expect(state.ok(USER).data).toEqual(USER);
    });

    it('resets pending flag', () => {
      const state = State<User>();

      expect(state.pending).toBe(true);
      expect(state.ok(USER).pending).toBe(false);
    });

    it('resets error', () => {
      const state = State<User>().fail(ERROR);

      expect(state.error).toBe(ERROR);
      expect(state.ok(USER).error).toBe('');
    });
  });

  describe('fail()', () => {
    it('sets data to initial', () => {
      const state = State<User[]>([]);

      expect(state.data).toEqual([]);
      expect(State<User[]>([]).ok([USER]).fail(ERROR).data).toEqual([]);
    });

    it('resets pending flag', () => {
      const state = State<User>();

      expect(state.pending).toBe(true);
      expect(state.fail(ERROR).pending).toBe(false);
    });

    it('sets error', () => {
      const state = State<User[]>([]);

      expect(state.error).toBe('');
      expect(state.fail(ERROR).error).toBe(ERROR);
    });
  });
});
