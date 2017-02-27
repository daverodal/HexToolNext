module.exports = {
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          "pug-loader?self",
        ]
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./src")]
  }
};
