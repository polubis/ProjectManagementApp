function delayedHello(name: string, delay: number): Promise<string> {
  return new Promise((resolve: (value?: string) => void) =>
    setTimeout(() => resolve(`Hello, ${name}`), delay),
  );
}

export async function greeter(name: string): Promise<string> {
  return await delayedHello(name, 2000);
}
