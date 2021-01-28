const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'jest-preset-angular',
  roots: [
    '<rootDir>/projects/sw2e/src/'
  ],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: [
    '<rootDir>/projects/sw2e/src/test.ts'
  ],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/my-app',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/'
  })
};
