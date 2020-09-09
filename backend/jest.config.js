module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
  moduleNameMapper: {
    '^@controllers(.*)$': '<rootDir>/src/controllers$1',
    '^@db(.*)$': '<rootDir>/src/db$1',
    '^@middlewares(.*)$': '<rootDir>/src/middlewares$1',
    '^@models(.*)$': '<rootDir>/src/models$1',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@ws(.*)$': '<rootDir>/src/ws$1',
    '^@consts': '<rootDir>/src/consts.ts',
  },
};
