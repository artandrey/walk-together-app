const wait = (delay?: number) => {
  return new Promise(res => {
    setTimeout(res, delay);
  });
};

export async function withDelay<T>(
  promise: Promise<T>,
  delay: number = 2000,
): Promise<T> {
  return (await Promise.all([promise, wait(delay)]))[0];
}
