// for test
export const testMethod = (a: string): Promise<any> => {
  return new Promise(resolve => {
    resolve(a);
  });
};

export function alignInRange(value: number, minValue: number, maxValue: number): number {
  if (value < minValue) {
    return minValue;
  }
  if (value > maxValue) {
    return maxValue;
  }
  return value;
}

export const testBabel = async () => {
  // const [a] = [1, 2]; // 1
  // let b = `====${a}====`; // ====1====
  // const { c } = { c: 3 }; // 3
  // const is = [1].includes(1); // true
  // const value = await testMethod('value'); // value
};

export function sleep(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => resolve(), delay);
  });
}

const a = (b, c) => {
  return c + b;
};
