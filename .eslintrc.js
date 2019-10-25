// const { strictEslint } = require('@umijs/fabric')
const strictEslint = {
  extends: ['airbnb', 'prettier', 'plugin:eslint-comments/recommended', 'prettier/react'],
  parser: 'babel-eslint',
  plugins: ['import', 'eslint-comments', 'unicorn', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    'react/no-array-index-key': 1,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'generator-star-spacing': 0,
    'function-paren-newline': 0,
    'import/no-unresolved': [2, { ignore: ['^@/'] }],
    'import/order': 'warn',
    'import/no-extraneous-dependencies': [
      2,
      {
        optionalDependencies: true,
        devDependencies: [
          '**/tests/**.{ts,js,jsx,tsx}',
          '**/_test_/**.{ts,js,jsx,tsx}',
          '/mock/**/**.{ts,js,jsx,tsx}',
          '**/**.test.{ts,js,jsx,tsx}',
          '**/_mock.{ts,js,jsx,tsx}',
          '**/example/**.{ts,js,jsx,tsx}',
          '**/examples/**.{ts,js,jsx,tsx}',
        ],
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'linebreak-style': 0,
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': [0, 'camel-case'],
    'import/no-named-as-default': 0,
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    // Use function hoisting to improve code readability
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    'import/no-cycle': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks

    // issue https://github.com/facebook/react/issues/15204
    'react-hooks/exhaustive-deps': 'off', // Checks effect dependencies

    // Conflict with prettier
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'object-curly-newline': 0,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    'eslint-comments/no-unlimited-disable': 1,
    'no-param-reassign': 1,
    'space-before-function-paren': 0,
    // 单行代码不超过160个字母 https://eslint.org/docs/rules/max-len
    'max-len': [
      'error',
      {
        code: 200,
      },
    ],
    // 禁止在返回语句中赋值
    'no-return-assign': 'off',
  },
  settings: {
    // support import modules from TypeScript files in JavaScript files
    'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] } },
    polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
  },
}

module.exports = strictEslint
