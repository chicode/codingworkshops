export default class ServerLang {
  needsLoading = true

  async getLoadingTime (apolloClient) {
    const {
      data: { compilationTime },
    } = await apolloClient.query({
      query: require('../graphql/CompilationTime.gql'),
      variables: {
        language: this.language.toUpperCase(),
      },
      fetchPolicy: 'network-only',
    })
    return compilationTime
  }

  async prepareCode (code, apolloClient) {
    const {
      data: { compileCode },
    } = await apolloClient.mutate({
      mutation: require('../graphql/CompileCode.gql'),
      variables: {
        language: this.language.toUpperCase(),
        code,
      },
    })
    // rename from_ to from
    const rename = (object) => ({ ...object, from: object.from_, from_: undefined })

    if (compileCode.warnings) compileCode.warnings = rename(compileCode.warnings)
    if (compileCode.errors) compileCode.errors = rename(compileCode.errors)

    if (compileCode.success) {
      return {
        success: true,
        warnings: compileCode.warnings,
        code: this.transformCode(code),
      }
    } else {
      return {
        success: false,
        blocked: compileCode.blocked,
        errors: compileCode.errors,
        warnings: compileCode.warnings,
      }
    }
  }
}
