module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'react-app', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['import'],
  ignorePatterns: ['/config/**'],
  rules: {
    'no-unused-vars': 1,
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': 0,
    'class-methods-use-this': 0,
    'func-names': 0,
    'import/no-unresolved': 0,
    'global-require': 0,
    'react/prop-types': 0,
    'react-hooks/exhaustive-deps': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'linebreak-style': ['error', require('os').EOL === '\r\n' ? 'windows' : 'unix'],
    'import/order': [
      1,
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'parent',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
};
