// convert from the error list sent from the backend
// to a more friendly object with fields as keys
export function convertErrors (errors, type = null) {
  return errors.reduce(
    (acc, val) => ({ ...acc, [type ? type + val.field.capitalize() : val.field]: val.message }),
    {},
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
  function (property) {
    return async (value) => {
      const key = `edit${type.capitalize()}`
      const {
        data: {
          [key]: { ok, errors },
        },
      } = await this.$apollo.mutate(
        require(`@/graphql/m/Edit${type.capitalize()}`).default({
          [property]: value,
          pk: getPk.call(this, type),
        }),
      )

      if (!ok) {
        if (namespacedErrors) this.errors[key] = convertErrors(errors)
        else this.errors = convertErrors(errors)
      } else {
        if (namespacedErrors) this.errors[key] = {}
        else this.errors = {}
      }
    }
  }

export const create = (
  type,
  parentType,
  { namespacedErrors = false, onSuccess = () => {}, getVars = () => ({}) } = {},
) =>
  async function () {
    const key = `create${type.capitalize()}`
    const {
      data: {
        [key]: { ok, errors },
      },
    } = await this.$apollo.mutate(
      require(`@/graphql/m/Create${type.capitalize()}`).default(
        {
          ...(parentType ? { [parentType]: this.data[parentType].id } : {}),
          ...getVars.call(this),
        },
        this.$route.params,
      ),
    )
    if (!ok) {
      if (namespacedErrors) this.errors[key] = convertErrors(errors)
      else this.errors = convertErrors(errors)
    } else {
      if (namespacedErrors) this.errors[key] = {}
      else this.errors = {}
      onSuccess.call(this)
    }
  }

export const apollo = (type) => ({
  apollo: {
    data: {
      loadingKey: 'loading',
      query: require(`@/graphql/q/${type.capitalize()}.gql`),
      variables () {
        return this.$route.params
      },
      update: (result) => result,
    },
  },
})

export const data = (errorKeys = []) => ({
  // sometimes the errors object needs to be nested
  errors: errorKeys.reduce((acc, val) => ({ ...acc, [val]: {} }), {}),
  loading: 0,
})

export const del = (type) =>
  function (pk) {
    this.$apollo.mutate(
      require(`@/graphql/m/Delete${this.type.capitalize()}`).default({ pk }, this.$route.params),
    )
  }

export const drag = () =>
  function ({ oldIndex, newIndex }) {
    this.$apollo.mutate(
      require(`@/graphql/m/Move${this.type.capitalize()}`).default(
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
