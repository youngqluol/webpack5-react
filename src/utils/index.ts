// for test
export const testMethod = (a: string): Promise<any> => {
  return new Promise(resolve => {
    resolve(a);
  });
};

export const testBabel = async () => {
  const [a] = [1, 2]; // 1
  let b = `====${a}====`; // ====1====
  const { c } = { c: 3 }; // 3
  const is = [1].includes(1); // true
  const value = await testMethod('value'); // value
  console.log('a:', a);
  console.log('b:', b);
  console.log('c:', c);
  console.log('is:', is);
  console.log('value:', value);
};
