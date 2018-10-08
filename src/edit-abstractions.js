// convert from the error list sent from the backend
// to a more friendly object with fields as keys
export function convertErrors (errors) {
  return errors.reduce((acc, val) => ({ ...acc, [val.field]: val.message }), {})
}

export const edit = (type) => ({
  edit (property) {
    return async (value) => {
      const {
        data: {
          [`edit${type.capitalize()}`]: { ok, errors },
        },
      } = await this.$apollo.mutate(
        require(`@/graphql/m/Edit${type.capitalize()}`).default({
          [property]: value,
          pk: this.data[type].id,
        }),
      )

      if (!ok) {
        this.errors = convertErrors(errors)
      } else {
        this.data[type][property] = value
        this.errors = []
      }
    }
  },
})

export const create = (type, parentType, onSuccess) => ({
  create: async function () {
    const {
      data: {
        [`create${type.capitalize()}`]: { ok, errors },
      },
    } = await this.$apollo.mutate(
      require(`@/graphql/m/Create${type.capitalize()}`).default(
        { [parentType]: this.data[parentType].id },
        this.$route.params,
      ),
    )
    if (!ok) console.error(errors)
    else {
      onSuccess.call(this)
    }
  },
})

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

export const data = () => ({
  errors: {},
  loading: 0,
})
