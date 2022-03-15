/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true, // 输出测试覆盖率报告
  moduleNameMapper: {
    // 跳过某些文件
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|scss|less)$':
      '<rootDir>/__test__/__mock__/fileMock.ts',
  },
};
