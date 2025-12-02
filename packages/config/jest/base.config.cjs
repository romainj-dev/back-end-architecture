const path = require('path')

/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@shared/(.*)$': path.join('<rootDir>', 'packages/shared/$1')
  }
}

