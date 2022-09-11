const path = require('path');

module.exports = async ({config}) => {
  config.resolve = {
    ...(config.resolve || {}),
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      providers: path.resolve(__dirname, '../src', 'providers'),
      // components: path.resolve(__dirname, '../src', 'components'),
      // hooks: path.resolve(__dirname, '../src', 'hooks'),
      // utils: path.resolve(__dirname, '../src', 'utils'),
      // hoc: path.resolve(__dirname, '../src', 'hoc'),
      // types: path.resolve(__dirname, '../src', 'types'),
    },
  };
  // fonts
  config.module.rules.push({
    test: /\.(png|woff|woff2|eot|ttf)$/,
    use: [
      {
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
        },
      },
    ],
    include: path.resolve(__dirname, '../'),
  });

  // don't forget to return.
  return config;
};
