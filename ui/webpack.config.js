const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ 
		loader: 'babel-loader'
	}]
      },
      { test: /\.css$/, use:['style-loader','css-loader'] }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    symlinks: false
  },
  output: {
    path: __dirname + '/../server/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
