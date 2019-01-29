import _ from 'lodash/fp'
import { toObject } from '@/lodash'
import * as mutations from '@/graphql/mutations'
import { schema } from '@/graphql/mutation-helpers'

function getRouteParams () {
  return this.$route.params
}

function mutation (mutation) {
  if (!mutations[mutation]) {
    throw new Error(`GraphQL mutation abstraction ${mutation} does not exist!`)
  }
  return mutations[mutation]
}

// convert from the error list sent from the backend
// to a more friendly object with fields as keys
export function convertErrors (errors, type = null) {
  return errors |> toObject(({ field }) => (type ? type + _.upperFirst(field) : field), 'message')
}

export const edit = (
  type,
  {
    getPk = function (type) {
      return this.data[_.lowerFirst(type)].id
    },
    namespacedErrors = false,
    errorsKey = 'errors',
  } = {},
) =>
  async function (property, value) {
    const key = `edit${type}`
    const { ok, errors } =
      (await this.$apollo.mutate(
        mutation(key)({
          [property]: value,
          pk: getPk.call(this, type),
        }),
      )) |> _.get(['data', key])
    _.set(this, namespacedErrors ? [errorsKey, key] : [errorsKey], ok ? {} : convertErrors(errors))
  }

export const create = (
  type,
  parentType,
  {
    namespacedErrors = false,
    onSuccess = _.noop,
    getVars = _.stubObject,
    getQueryVariables = getRouteParams,
    errorsKey = 'errors',
    getParentPk = function (type) {
      return this.data[_.lowerFirst(type)].id
    },
  } = {},
) =>
  async function () {
    const key = `create${type}`
    const { ok, errors } =
      (await this.$apollo.mutate(
        mutation(key)(
          _.assign(
            parentType ? { [_.lowerFirst(parentType)]: getParentPk.call(this, parentType) } : {},
            getVars.call(this),
          ),
          getQueryVariables.call(this),
        ),
      )) |> _.get(['data', key])

    _.set(this, namespacedErrors ? [errorsKey, key] : [errorsKey], ok ? {} : convertErrors(errors))
    if (ok) onSuccess.call(this)
  }

export const del = (type) =>
  function (pk, { getQueryVariables = getRouteParams } = {}) {
    this.$apollo.mutate(mutation(`delete${type}`)({ pk }, getQueryVariables.call(this)))
  }

export const data = ({ errorKeys = [], errorsKey = 'errors', loadingKey = 'loading' } = {}) => ({
  // sometimes the errors object needs to be nested
  [errorsKey]: errorKeys |> toObject(_.identity, _.stubObject),
  [loadingKey]: 0,
})

export const apollo = (
  type,
  { getQueryVariables = getRouteParams, loadingKey = 'loading', queryKey = null } = {},
) => ({
  loadingKey,
  query: schema(type),
  variables: getQueryVariables,
  update: queryKey ? _.property(queryKey) : _.identity,
})

export const drag = (type) =>
  function ({ oldIndex, newIndex }) {
    this.$apollo.mutate(
      mutation(`move${type}`)({
        // oldIndex is unchanged bc array is 0 indexed
        pk: this.items[oldIndex].id,
        // newIndex is changed bc index is 1 indexed on server
        index: newIndex + 1,
      }),
    )
  }
