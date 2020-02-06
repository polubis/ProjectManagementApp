import { renderHook, act } from '@testing-library/react-hooks';
import useForm, {
  min,
  max,
  req,
  UseFormConfig,
  UseFormChangeEvent,
  UseFormSubmitEvent
} from '.';

// TODO: Write unit tests for all validators
describe('validators under tests', () => {});

describe('useForm() under tests', () => {
  type ConfigKeys = 'username' | 'email' | 'password';

  let config: UseFormConfig;

  beforeEach(() => {
    config = {
      username: { value: '' },
      email: { value: 'example1994@gmail.com', validators: [req] },
      password: {
        value: 'example1994@gmail.com',
        validators: [req, min(4), max(20)]
      }
    };
  });

  test('should create inital state based on config', () => {
    const { result } = renderHook(() => useForm<ConfigKeys>(config));
    const [fields, areFieldInvalid] = result.current;

    expect(fields.username.value).toBe(config.username.value);
    expect(fields.email.value).toEqual(config.email.value);
    expect(fields.password.value).toBe(config.password.value);
    expect(areFieldInvalid).toBe(false);
  });

  describe('handleChange() under tests', () => {
    test('should update field value correctly', () => {
      const { result } = renderHook(() => useForm<ConfigKeys>(config));

      const event = {
        target: {
          value: '@gmail.comm',
          dataset: {
            fieldKey: 'email'
          }
        }
      };

      act(() => {
        const handleChange = result.current[2];
        handleChange((event as unknown) as UseFormChangeEvent);
      });

      const [fields] = result.current;

      expect(fields.email.value).toBe(event.target.value);
    });

    test('should update field validation correctly', () => {
      const { result } = renderHook(() => useForm<ConfigKeys>(config));

      const event = {
        target: {
          value: '',
          dataset: {
            fieldKey: 'password'
          }
        }
      };

      act(() => {
        const handleChange = result.current[2];
        handleChange((event as unknown) as UseFormChangeEvent);
      });

      const [fields] = result.current;
      const [req, min, max] = fields.password.errors;

      expect(fields.password.valid).toBe(false);
      expect(req.valid).toBe(false);
      expect(min.valid).toBe(false);
      expect(max.valid).toBe(true);
    });

    test('should throw an error if fieldKey missing', () => {
      const { result } = renderHook(() => useForm<ConfigKeys>(config));

      const event = {
        target: {
          value: '',
          dataset: {}
        }
      };

      act(() => {
        try {
          const handleChange = result.current[2];
          handleChange((event as unknown) as UseFormChangeEvent);
          expect(false).toBe(true); // react testing library needs that to catch error from tested method
        } catch (e) {
          expect(e.message).toEqual('Attribute data-field-key is missing');
        }
      });
    });

    test('should change areFieldsInvalid if handleSubmit method has been called', () => {
      const { result } = renderHook(() => useForm<ConfigKeys>(config));
      const submitEvent = { preventDefault: () => {} };
      const changeEvent = {
        target: {
          value: 'correctpassword',
          dataset: {
            fieldKey: 'password'
          }
        }
      };

      act(() => {
        const handleSubmit = result.current[3];
        handleSubmit((submitEvent as unknown) as UseFormSubmitEvent);
      });

      expect(result.current[1]).toBe(true);

      act(() => {
        const handleChange = result.current[2];
        handleChange((changeEvent as unknown) as UseFormChangeEvent);
      });

      expect(result.current[1]).toBe(false);
    });
  });

  describe('handleSubmit() under tests', () => {
    test('should validate correctly all fields', () => {
      const { result } = renderHook(() => useForm<ConfigKeys>(config));
      const changeEvent = {
        target: {
          value: '',
          dataset: {
            fieldKey: 'password'
          }
        }
      };
      const submitEvent = { preventDefault: () => {} };

      act(() => {
        const handleChange = result.current[2];
        handleChange((changeEvent as unknown) as UseFormChangeEvent);
      });

      act(() => {
        const handleSubmit = result.current[3];
        const areFieldsInvalid = handleSubmit(
          (submitEvent as unknown) as UseFormSubmitEvent
        );
        expect(areFieldsInvalid).toBe(true);
      });

      expect(result.current[1]).toBe(true);
    });
  });
});

// fdescribe('useForm()', () => {
//   type MockFieldsConfig = 'username' | 'description' | 'label' | 'cost' | 'percentage';
//   let config: FieldsConfig<MockFieldsConfig>;

//   const getFieldObject = (fieldkey: MockFieldsConfig) => ({
//     fieldkey,
//     error: '',
//     value: ''
//   });

//   const getEventMock = (value: string, dataKey?: MockFieldsConfig) => ({
//     target: { value },
//     currentTarget: { getAttribute: () => dataKey }
//   });

//   beforeEach(() => {
//     config = {
//       username: {},
//       description: {},
//       label: {},
//       cost: {},
//       percentage: {}
//     };
//   });

//   test('should create initial state', () => {
//     const {
//       result: { current }
//     } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}));

//     expect(current.state.errorsOccured).toBe(false);
//     expect(current.state.keys).toEqual(Object.keys(config));
//     expect(current.state.fields).toEqual({
//       username: getFieldObject('username'),
//       description: getFieldObject('description'),
//       label: getFieldObject('label'),
//       cost: getFieldObject('cost'),
//       percentage: getFieldObject('percentage')
//     } as FieldsState<MockFieldsConfig>);
//   });

//   test('should set dirty parameter as true by default', () => {
//     const {
//       result: { current }
//     } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}));

//     expect(current.state.dirty).toBe(true);
//   });

//   test('should set dirty parameter as false if given ValidationStrategy is AfterSubmit', () => {
//     const {
//       result: { current }
//     } = renderHook(() =>
//       useForm<MockFieldsConfig>(config, () => {}, {}, ValidationStrategy.AfterSubmit)
//     );

//     expect(current.state.dirty).toBe(false);
//   });

//   test('should populate initial state with provided cached values', () => {
//     const cacheMock: Partial<FieldsValues<MockFieldsConfig>> = {
//       username: 'Piotr',
//       description: 'Example description',
//       cost: 3.43
//     };

//     const {
//       result: { current }
//     } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}, cacheMock));

//     expect(current.state.fields.username.value).toEqual(cacheMock.username);
//     expect(current.state.fields.description.value).toEqual(cacheMock.description);
//     expect(current.state.fields.cost.value).toEqual(cacheMock.cost);
//     expect(current.state.fields.label.value).toBe('');
//     expect(current.state.fields.percentage.value).toBe('');
//   });

//   describe('handleTyping()', () => {
//     test('should set new value from event object is not passed', () => {
//       const { result } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}));

//       act(() => {
//         try {
//           result.current.handleChange(null, 'username', 'exmaple-username');
//           expect(true).toBe(false);
//         } catch (e) {
//           expect(e.message).toEqual('Event object is required');
//         }
//       });
//     });

//     test('should throw error if data key is not passed in event object as dataKey parameter', () => {
//       const {
//         result: { current }
//       } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}));

//       act(() => {
//         try {
//           current.handleChange(getEventMock('example-value'));
//           expect(true).toBe(false);
//         } catch (e) {
//           expect(e.message).toEqual('data-key attribute is missing in given template');
//         }
//       });
//     });

//     test('should set new value from directValue parameter', () => {
//       const mockName = 'example-name';
//       const { result } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}));

//       act(() => {
//         result.current.handleChange(
//           getEventMock('example-2-username', 'username'),
//           'username',
//           mockName
//         );
//       });

//       expect(result.current.state.fields.username.value).toBe(mockName);
//     });

//     test('should set value based on key from directKey parameter', () => {
//       const mockName = 'example-name';
//       const { result } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}));

//       act(() => {
//         result.current.handleChange({}, 'username', mockName);
//       });

//       expect(result.current.state.fields.username.value).toBe(mockName);
//     });

//     test('should set error based on given validators in config if form is dirty', () => {
//       const { result } = renderHook(() =>
//         useForm<MockFieldsConfig>(
//           {
//             ...config,
//             username: {
//               validate: (value, state) => {
//                 if (value.length === 0) {
//                   return 'Error';
//                 }

//                 return '';
//               }
//             }
//           },
//           () => {}
//         )
//       );

//       act(() => {
//         result.current.handleSubmit({ preventDefault: () => {} } as any);
//         result.current.handleChange({}, 'username', '');
//       });

//       expect(result.current.state.fields.username.error).toBe('Error');
//     });

//     test('should avoid validation if form is not dirty and validation strategy is AfterSubmit', () => {
//       const { result } = renderHook(() =>
//         useForm<MockFieldsConfig>(
//           {
//             ...config,
//             username: {
//               validate: (value, state) => {
//                 if (value.length === 0) {
//                   return 'Error';
//                 }

//                 return '';
//               }
//             }
//           },
//           () => {},
//           {},
//           ValidationStrategy.AfterSubmit
//         )
//       );

//       act(() => {
//         result.current.handleChange({}, 'username', '');
//       });

//       expect(result.current.state.fields.username.error).toBe('');
//     });

//     test('should set errors occured if form is dirty', () => {
//       const { result } = renderHook(() =>
//         useForm<MockFieldsConfig>(
//           {
//             ...config,
//             username: {
//               validate: (value, state) => {
//                 if (value.length === 1) {
//                   return 'Error';
//                 }

//                 return '';
//               }
//             }
//           },
//           () => {}
//         )
//       );

//       act(() => {
//         result.current.handleSubmit({ preventDefault: () => {} } as any);
//         result.current.handleChange({}, 'username', 's');
//       });

//       expect(result.current.state.fields.username.error).toBe('Error');
//       expect(result.current.state.errorsOccured).toBe(true);
//       expect(result.current.state.dirty).toBe(true);
//     });

//     test('should call validate method for connected field', () => {
//       const { result } = renderHook(() =>
//         useForm<MockFieldsConfig>(
//           {
//             ...config,
//             username: {
//               validate: (value, state) => {
//                 if (value.length === 1) {
//                   return 'Error';
//                 }

//                 return '';
//               }
//             },
//             description: {
//               validate: (value, state) => {
//                 if (value.length === 1) {
//                   return 'Error';
//                 }

//                 return '';
//               }
//             }
//           },
//           () => {},
//           { description: 's' }
//         )
//       );

//       act(() => {
//         result.current.handleSubmit({ preventDefault: () => {} } as any);
//         result.current.handleChange({}, 'username', 's');
//       });

//       expect(result.current.state.fields.username.error).toBe('Error');
//       expect(result.current.state.fields.description.error).toBe('Error');
//     });
//   });

//   describe('handleSubmit()', () => {
//     test('should set dirty attribute after submit', () => {
//       const { result } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}));

//       act(() => {
//         result.current.handleSubmit({ preventDefault: () => {} } as any);
//       });

//       expect(result.current.state.dirty).toBe(true);
//     });

//     test('should set errorsOccured if errors will be detected', () => {
//       const { result } = renderHook(() =>
//         useForm<MockFieldsConfig>(
//           {
//             ...config,
//             username: {
//               validate: (v, s) => {
//                 if (v.length === 0) {
//                   return 'Username field is required';
//                 }
//                 return '';
//               }
//             }
//           },
//           () => {}
//         )
//       );

//       act(() => {
//         result.current.handleSubmit({ preventDefault: () => {} } as any);
//       });

//       expect(result.current.state.errorsOccured).toBe(true);
//     });

//     test('should call all validate methods and set errors', () => {
//       const { result } = renderHook(() =>
//         useForm<MockFieldsConfig>(
//           {
//             ...config,
//             username: {
//               validate: (v, s) => {
//                 if (v.length === 0) {
//                   return 'Username field is required';
//                 }
//                 return '';
//               }
//             }
//           },
//           () => {}
//         )
//       );

//       act(() => {
//         result.current.handleSubmit({ preventDefault: () => {} } as any);
//       });

//       expect(result.current.state.fields.username.error).toBe('Username field is required');
//     });

//     test('should call onSuccessSubmit callback if no errors detected', () => {
//       const { result } = renderHook(() =>
//         useForm<MockFieldsConfig>(config, values => {
//           expect(values).toEqual({
//             username: 's',
//             description: '',
//             cost: '',
//             label: '',
//             percentage: ''
//           } as FieldsValues<MockFieldsConfig>);
//         })
//       );

//       act(() => {
//         result.current.handleChange({}, 'username', 's');
//       });

//       act(() => {
//         result.current.handleSubmit({ preventDefault: () => {} } as any);
//       });

//       expect(result.current.state.errorsOccured).toBe(false);
//     });
//   });
// });
