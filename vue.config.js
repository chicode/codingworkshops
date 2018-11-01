module.exports = {
  chainWebpack: (config) => {
    // https://github.com/graphql/graphql-js/issues/1272
    config.resolve.extensions.prepend('.mjs')
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
  },
}
