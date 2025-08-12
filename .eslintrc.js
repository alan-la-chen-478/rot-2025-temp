module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['expo', 'prettier'],
  plugins: ['prettier', 'import', 'unused-imports'],
  rules: {
    'prettier/prettier': 'warn',
    'sort-imports': ['error', {ignoreCase: true, ignoreDeclarationSort: true}],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_|props',
      },
    ],
  },
};
