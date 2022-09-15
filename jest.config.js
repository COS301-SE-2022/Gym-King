
const path = require('path');
module.exports = {
  
  preset: 'ts-jest',
  testEnvironment: 'node',

  
  roots: ['<rootDir>/src','<rootDir>','<rootDir>../'],
  clearMocks: true,
  maxWorkers: 1,
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testRegex: '(\\.|/)(test|spec)\\.ts?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageReporters: ['text'],

  moduleNameMapper: {
    "^typeorm/(.*)": "<rootDir>\\typeorm\\$1"
  }

};

console.log(path.join(__dirname,"../node_modules/"))