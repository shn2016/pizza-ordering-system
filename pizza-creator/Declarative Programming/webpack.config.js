const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode:'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // to find the dist in the current path = ./dist
    filename: 'bundle.js'
  },
  
};