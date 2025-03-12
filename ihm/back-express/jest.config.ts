module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./src/tests/config.ts'], // Adjust the path to your setup file
  transformIgnorePatterns: ['<rootDir>/node_modules/'], // Ensure node_modules are ignored for transformation
};
