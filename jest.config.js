module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', '<rootDir>'],
  transform: {
    '^.+\.(ts|js|html)$': [
      'jest-preset-angular',
      {
        stringifyContentPathRegex: '\.(html|svg)$',
        useESM: true
      }
    ]
  },
  testMatch: [
    '<rootDir>/projects/*/src/**/*.spec.ts'
  ]
};
