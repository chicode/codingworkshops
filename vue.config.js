const path = require('path')

const elmProjects = ['src/nico/src/nico/languages/lisa/']

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        ...elmProjects.map(cwd => ({
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          include: [path.join(__dirname, cwd)],
          loader: 'elm-webpack-loader',
          options: {
            cwd,
          },
        })),
      ],
    },
  },
}
