/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  preset: "ts-jest",
  collectCoverage: true,
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@adapters/(.*)$': ['<rootDir>/src/adapters/$1'],
    '^@application/(.*)$': ['<rootDir>/src/core/application/$1'],
    '^@domain/(.*)$': ['<rootDir>/src/core/domain/$1'],
    '^@shared/(.*)$': ['<rootDir>/src/shared/$1'],
  }
};

module.exports = config;
