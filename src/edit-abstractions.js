import _ from 'lodash/fp'

// convert from the error list sent from the backend
// to a more friendly object with fields as keys
export function convertErrors (errors, type = null) {
  return (
    errors
    |> _.map((error) => [type ? type + _.capitalize(error.field) : error.field, error.message])
    |> _.fromPairs
  )
}

export const edit = (
  type,
  {
    getPk = function (type) {
      return this.data[type].id
    },
    namespacedErrors = false,
  } = {},
) =>
  async function (property, value) {
    const key = `edit${_.capitalize(type)}`
    const { ok, errors } =
      (await this.$apollo.mutate(
        require(`@/graphql/m/Edit${type.capitalize()}`).default({
          [property]: value,
          pk: getPk.call(this, type),
        }),
      )) |> _.at(['data', key])
    _.set(this, namespacedErrors ? ['errors', key] : ['errors'], ok ? {} : convertErrors(errors))
  } |> _.curry // this curry makes using this function inside of vue components easier

export const create = (
  type,
  parentType,
  { namespacedErrors = false, onSuccess = _.noop, getVars = _.stubObject } = {},
) =>
  async function () {
    const key = `create${_.capitalize(type)}`
    const { ok, errors } =
      (await this.$apollo.mutate(
        require(`@/graphql/m/Create${type.capitalize()}`).default(
          {
            ...(parentType ? { [parentType]: this.data[parentType].id } : {}),
            ...getVars.call(this),
          },
          this.$route.params,
        ),
      )) |> _.at(['data', key])
    _.set(this, namespacedErrors ? ['errors', key] : ['errors'], ok ? {} : convertErrors(errors))
    if (ok) onSuccess.call(this)
  }

export const apollo = (...types) => ({
  apollo:
    types
    |> _.map((type) => [
      type,
      {
        loadingKey: 'loading',
        query: require(`@/graphql/q/${_.capitalize(type)}.gql`),
        variables () {
          return this.$route.params
        },
        update: (result) => result,
      },
    ])
    |> _.fromPairs,
})

export const data = (errorKeys = []) => ({
  // sometimes the errors object needs to be nested
  errors: errorKeys |> _.map((error) => [error, {}]) |> _.fromPairs,
  loading: 0,
})

export const del = (type) =>
  function (pk) {
    this.$apollo.mutate(
      require(`@/graphql/m/Delete${_.capitalize(this.type)}`).default({ pk }, this.$route.params),
    )
  }

export const drag = () =>
  function ({ oldIndex, newIndex }) {
    this.$apollo.mutate(
      require(`@/graphql/m/Move${_.capitalize(this.type)}`).default(
        {
          // oldIndex is unchanged bc array is 0 indexed
          pk: this.items[oldIndex].id,
          // newIndex is changed bc index is 1 indexed on server
          index: newIndex + 1,
        },
        this.$route.params,
      ),
    )
  }
