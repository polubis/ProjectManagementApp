import { greeter } from '../testFile';
import { Controllers } from '@controllers';

describe('greeter function', () => {
  jest.useFakeTimers();
  console.log(Controllers);
  const name = 'Czaroslaw';
  let hello: string;

  beforeAll(async () => {
    const p: Promise<string> = greeter(name);
    jest.runOnlyPendingTimers();
    hello = await p;
  });

  it('should delay the greeting by 2 seconds', () => {
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
  });

  it('should greet a user with `Hello, {name}` message', () => {
    expect(hello).toBe(`Hello, ${name}`);
  });
});
