module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'prettier',
  ],
  plugins: ['react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    'react-native/react-native': true,
    es6: true,
  },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
