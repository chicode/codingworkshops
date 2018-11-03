import Lang from './Lang'
import { CompilationTime, compileCode } from '../graphql/schema.gql'

export default class ServerLang extends Lang {
  needsLoading = true

  async getLoadingTime (apolloClient) {
    const {
      data: { compilationTime },
    } = await apolloClient.query({
      query: CompilationTime,
      variables: {
        language: this.language.toUpperCase(),
      },
      fetchPolicy: 'network-only',
    })
    return compilationTime
  }

  async prepareCode (code, apolloClient) {
    const {
      data: { compiledCode },
    } = await apolloClient.mutate({
      mutation: compileCode,
      variables: {
        language: this.language.toUpperCase(),
        code,
      },
    })
    // rename from_ to from
    const rename = (objects) =>
      objects.map((object) => ({ ...object, from: object.from_, from_: undefined }))

    if (compiledCode.warnings) compiledCode.warnings = rename(compiledCode.warnings)
    if (compiledCode.errors) compiledCode.errors = rename(compiledCode.errors)

    if (compiledCode.success) {
      return {
        success: true,
        warnings: compiledCode.warnings,
        code: this.transformCode(compiledCode.code),
      }
    } else {
      return {
        success: false,
        blocked: compiledCode.blocked,
        errors: compiledCode.errors,
        warnings: compiledCode.warnings,
      }
    }
  }
}
