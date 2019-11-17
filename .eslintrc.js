module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier'
  ],
  extends: [
    'plugin:react/recommended',
    'standard',
    'prettier',
    'prettier/standard'
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none'
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
