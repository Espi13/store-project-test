const nextJest = require('next/jest');

const { compilerOptions } = require('./tsconfig.json');
// Sync object
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const moduleNameMapper = Object.keys(compilerOptions.paths).reduce((acc, key) => {
  const path = compilerOptions.paths[key];
  return {
    ...acc,
    [`^${key.replace('*', '(.*)')}$`]: path.map((p) => `<rootDir>/src/${p.replace('*', '$1')}`),
  };
}, {});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/ui/(.*)$': '<rootDir>/ui/$1',
    '^@/api/(.*)$': '<rootDir>/api/$1',
    '^@/context/(.*)$': '<rootDir>/context/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
  },
  modulePaths: ['<rootDir>/components/', '<rootDir>/pages/', '<rootDir>/src/hooks/'],
};

module.exports = createJestConfig(customJestConfig);
