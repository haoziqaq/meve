import {
  CWD,
  JEST_MEDIA_MOCK,
  JEST_STYLE_MOCK,
  EXAMPLE_DIR_NAME,
  DOCS_DIR_NAME,
  TESTS_DIR_NAME,
} from '../shared/constant'
import { pathExistsSync } from 'fs-extra'
import { resolve } from 'path'

function getRootConfig() {
  const file = resolve(CWD, 'jest.config.js')

  if (pathExistsSync(file)) {
    delete require.cache[require.resolve(file)]
    return require(file)
  }

  return {}
}

module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': JEST_STYLE_MOCK,
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$': JEST_MEDIA_MOCK,
  },
  transform: {
    '\\.(vue)$': 'vue-jest',
    '\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx,vue}',
    `!**/${EXAMPLE_DIR_NAME}/**`,
    `!**/${DOCS_DIR_NAME}/**`,
    `!**/${TESTS_DIR_NAME}/**`,
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
  transformIgnorePatterns: ['/node_modules/(?!(@meve/cli))'],
  ...getRootConfig(),
}
