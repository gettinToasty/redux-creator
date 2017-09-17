const config = {
  setupFiles: [
    '<rootDir>/node_modules/babel-polyfill/dist/polyfill.js'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '/__tests__/fixtures/'
  ],
  unmockedModulePathPatterns: [
    'react',
    'react-dom',
    'react-addons-test-utils',
    'react-addons-update',
    'redux-actions',
    'fbjs',
    'enzyme',
    'cheerio',
    'htmlparser2',
    'underscore',
    'lodash',
    'domhandler',
    'object.assign',
    'define-properties',
    'function-bind',
    'object-keys',
    'classnames',
    'nock',
    'redux-mock-store',
    'redux-thunk'
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'node'
  ],
};

module.exports = config;
