module.exports = {
  ignorePatterns: [ "src/migrations/*"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-trailing-spaces': 'error',
    'eol-last': ["error", "always"],
    indent: ["error", 2, { SwitchCase: 1 }],
    quotes: ["error", "single", { "allowTemplateLiterals": true } ],
    semi: ["error", "always"],
    "linebreak-style": 0,
    "no-empty": ["error", { "allowEmptyCatch": true }],
    "array-element-newline": ["error", "consistent"],
    "array-bracket-spacing": ["error", "never"],
    "array-bracket-newline": ["error", { "multiline": true }],
    "object-curly-spacing": ["error", "always"],
    "object-property-newline": "error",
    "object-curly-newline": ["error", {"multiline": true, "minProperties": 3}],
    // ts
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
