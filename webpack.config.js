const path = require('path');

module.exports = {
  entry: './src/instance.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'digger.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
