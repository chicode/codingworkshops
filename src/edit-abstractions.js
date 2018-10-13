// convert from the error list sent from the backend
// to a more friendly object with fields as keys
export function convertErrors (errors) {
  return errors.reduce((acc, val) => ({ ...acc, [val.field]: val.message }), {})
}

export const edit = (
  type,
  {
    namespaced = false,
    getPk = function (type) {
      return this.data[type].id
    },
  } = {},
) => {
  return {
    [namespaced ? `edit${type.capitalize()}` : 'edit'] (property) {
      return async (value) => {
        const {
          data: {
            [`edit${type.capitalize()}`]: { ok, errors },
          },
        } = await this.$apollo.mutate(
          require(`@/graphql/m/Edit${type.capitalize()}`).default({
            [property]: value,
            pk: getPk.call(this, type),
          }),
        )

        if (!ok) {
          this.errors = convertErrors(errors)
        } else {
          this.errors = []
        }
      }
    },
  }
}

export const create = (
  type,
  parentType,
  { namespaced = false, onSuccess = () => {}, getVars = () => ({}) } = {},
) => {
  return {
    async [namespaced ? `create{type.capitalize()}` : 'create'] () {
      const {
        data: {
          [`create${type.capitalize()}`]: { ok, errors },
        },
      } = await this.$apollo.mutate(
        require(`@/graphql/m/Create${type.capitalize()}`).default(
          {
            [parentType]: this.data[parentType].id,
            ...getVars.call(this),
          },
          this.$route.params,
        ),
      )
      if (!ok) console.error(errors)
      else {
        onSuccess.call(this)
      }
    },
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

export const data = () => ({
  errors: {},
  loading: 0,
})

export const del = (type) => ({
  del (pk) {
    this.$apollo.mutate(
      require(`@/graphql/m/Delete${this.type.capitalize()}`).default({ pk }, this.$route.params),
    )
  },
})

export const drag = () => ({
  drag ({ oldIndex, newIndex }) {
    this.$apollo.mutate(
      require(`@/graphql/m/Move${this.type.capitalize()}`).default(
        {
          pk: this.items[oldIndex].id,
          index: newIndex + 1,
        },
        this.$route.params,
      ),
    )
  },
})
