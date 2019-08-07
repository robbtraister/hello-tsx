'use strict'

module.exports = {
  plugins: [
    '@babel/syntax-dynamic-import',
    '@babel/transform-runtime'
  ],
  presets: [
    '@babel/env',
    '@babel/react',
    [
      '@babel/typescript',
      {
        isTSX: true,
        allExtensions: true
      }
    ]
  ]
}
