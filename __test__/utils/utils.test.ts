import { alignInRange } from '../../src/utils';

// 最小值和最大值的区间为[5,30]，输入的 value 为10，期望输出结果为 10
test('test alignInRange return value', () => {
  expect(alignInRange(10, 5, 30)).toBe(10);
});
