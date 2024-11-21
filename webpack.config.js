const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack'); // Import dotenv-webpack

module.exports = {
  mode: 'development', // Development mode for easier debugging
  entry: './src/index.js', // Entry point for the application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output filename
    clean: true, // Cleans the output directory before each build
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/, // Match both .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Transpile modern JavaScript to compatible versions
          options: {
            presets: [
              '@babel/preset-env', // For modern JavaScript
              '@babel/preset-react', // For React JSX support
            ],
          },
        },
      },
      {
        test: /\.css$/, // Match CSS files
        use: ['style-loader', 'css-loader'], // Handles CSS files
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Handles image assets
        type: 'asset/resource',
      },
      {
        test: /\.env$/, // Handle .env files if needed
        use: 'dotenv-webpack',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve both .js and .jsx extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to the HTML template
      filename: 'index.html', // Output file name
    }),
    new Dotenv(), // Load environment variables from .env file
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve static files from dist folder
    },
    compress: true, // Enable gzip compression
    port: 9000, // Dev server port
    open: true, // Open the browser automatically
    hot: true, // Enable hot module replacement
  },
};
