const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'jest-preset-angular',
  roots: [
    '<rootDir>/projects/sw2e/src/',
    '<rootDir>/projects/d6/src/',
    '<rootDir>/projects/perfugium/src/',
  ],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: [
    '<rootDir>/projects/sw2e/src/test.ts',
    '<rootDir>/projects/d6/src/test.ts',
    '<rootDir>/projects/perfugium/src/test.ts'
  ],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/my-app',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/'
  })
};
