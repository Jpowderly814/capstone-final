module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/components/__Mocks__/styleMock.js',
  },
};
