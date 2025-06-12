module.exports = {
  presets: [['@exercism/babel-preset-typescript', { corejs: '3.43' }]],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '~src': './src',
          '~test': './test',
        },
      },
    ],
  ],
}
