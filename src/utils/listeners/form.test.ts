import { Form } from './form';

describe('Form', () => {
  it('throws error for invalid values', () => {
    (() => {
      try {
        new Form(null);
        expect(true).toBe(false);
      } catch (err) {
        expect(err.message).toBe('values parameter must be an object');
      }
    })();
    (() => {
      try {
        new Form(undefined);
        expect(true).toBe(false);
      } catch (err) {
        expect(err.message).toBe('values parameter must be an object');
      }
    })();
    (() => {
      try {
        new Form([]);
        expect(true).toBe(false);
      } catch (err) {
        expect(err.message).toBe('values parameter must be an object');
      }
    })();
  });

  it('throws error for invalid fns', () => {
    (() => {
      try {
        new Form({}, null);
        expect(true).toBe(false);
      } catch (err) {
        expect(err.message).toBe('fns parameter must be an object');
      }
    })();
    (() => {
      try {
        new Form({}, []);
        expect(true).toBe(false);
      } catch (err) {
        expect(err.message).toBe('fns parameter must be an object');
      }
    })();
  });

  it('creates init state', () => {
    const initValues = {
      code: 112,
      email: 'exampel@wp.pl'
    };

    const form = new Form(initValues);

    expect(form.values).toEqual(initValues);
    expect(form.dirty).toBeFalsy();
    expect(form.invalid).toBeFalsy();
    expect(form.touched).toBeFalsy();
  });

  it('allows set dirty flag', () => {
    expect(new Form({}, {}, true).dirty).toBeTruthy();
  });

  it('allows set touched flag', () => {
    expect(new Form({}, {}, false, true).touched).toBeTruthy();
  });

  it('validates on init', () => {
    (() => {
      const form = new Form(
        {
          code: 112,
          email: ''
        },
        {
          email: [(value) => value.length === 0]
        }
      );

      expect(form.errors).toEqual({
        code: false,
        email: true
      });
      expect(form.invalid).toBeTruthy();
    })();

    (() => {
      const form = new Form(
        {
          code: 112,
          email: 'polubik194'
        },
        {}
      );

      expect(form.errors).toEqual({
        code: false,
        email: false
      });
      expect(form.invalid).toBeFalsy();
    })();
  });

  describe('set()', () => {
    it('changes values', () => {
      const form = new Form({
        code: 112,
        email: 'exampel@wp.pl'
      });
      const nextValues = {
        code: 1124,
        email: ''
      };

      form.set(nextValues);

      expect(form.values).toEqual(nextValues);

      form.set({ ...nextValues, code: 112 });

      expect(form.values).toEqual({ ...nextValues, code: 112 });
    });

    it('changes values partly', () => {
      const form = new Form(
        {
          code: 112,
          email: 'exampel@wp.pl'
        },
        {}
      );

      form.set({ code: 11 });

      expect(form.values).toEqual({
        code: 11,
        email: 'exampel@wp.pl'
      });
    });

    it('validates on change', () => {
      const form = new Form(
        {
          code: 112,
          email: 'exampel@wp.pl'
        },
        {
          email: [(value) => value.length === 0]
        }
      );
      const nextValues = {
        code: 1124,
        email: ''
      };

      form.set(nextValues);

      expect(form.errors).toEqual({
        code: false,
        email: true
      });
      expect(form.invalid).toBeTruthy();
    });

    it('sets touched flag', () => {
      const form = new Form({
        code: 112,
        email: 'exampel@wp.pl'
      });

      form.set({
        code: 1124
      });

      expect(form.touched).toBeTruthy();
    });

    it('throws error for invalid values', () => {
      (() => {
        try {
          new Form({}).set(null);
        } catch (err) {
          expect(err.message).toBe('values parameter must be an object');
        }
      })();

      (() => {
        try {
          new Form({}).set(undefined);
        } catch (err) {
          expect(err.message).toBe('values parameter must be an object');
        }
      })();

      (() => {
        try {
          new Form({}).set([]);
        } catch (err) {
          expect(err.message).toBe('values parameter must be an object');
        }
      })();
    });
  });

  describe('next()', () => {
    it('changes values', () => {
      const form = new Form({
        code: 112,
        email: 'exampel@wp.pl'
      });
      const nextValues = {
        code: 1124,
        email: ''
      };

      expect(form.next(nextValues).values).toEqual(nextValues);
      expect(form.next({ ...nextValues, code: 112 }).values).toEqual({ ...nextValues, code: 112 });
    });

    it('changes values partly', () => {
      const form = new Form(
        {
          code: 112,
          email: 'exampel@wp.pl'
        },
        {}
      );

      expect(form.next({ code: 11 }).values).toEqual({
        code: 11,
        email: 'exampel@wp.pl'
      });
    });

    it('validates on change', () => {
      const form = new Form(
        {
          code: 112,
          email: 'exampel@wp.pl'
        },
        {
          email: [(value) => value.length === 0]
        }
      );
      const nextValues = {
        code: 1124,
        email: ''
      };

      const nextForm = form.next(nextValues);

      expect(nextForm.errors).toEqual({
        code: false,
        email: true
      });
      expect(nextForm.invalid).toBeTruthy();
    });

    it('sets touched flag', () => {
      const form = new Form({
        code: 112,
        email: 'exampel@wp.pl'
      });

      expect(
        form.next({
          code: 1124
        }).touched
      ).toBeTruthy();
    });

    it('throws error for invalid values', () => {
      (() => {
        try {
          new Form({}).next(null);
        } catch (err) {
          expect(err.message).toBe('values parameter must be an object');
        }
      })();

      (() => {
        try {
          new Form({}).next(undefined);
        } catch (err) {
          expect(err.message).toBe('values parameter must be an object');
        }
      })();

      (() => {
        try {
          new Form({}).next([]);
        } catch (err) {
          expect(err.message).toBe('values parameter must be an object');
        }
      })();
    });
  });
});
