import _ from 'lodash/fp'
import { toObject } from '@/lodash'
import * as schemaObject from '@/graphql/schema.gql'

function getRouteParams () {
  return this.$route.params
}

function schema (key) {
  if (!schemaObject[key]) {
    throw new Error(`GraphQL type ${key} does not exist!`)
  }
  return schemaObject[key]
}

// convert from the error list sent from the backend
// to a more friendly object with fields as keys
export function convertErrors (errors, type = null) {
  return errors |> toObject(({ field }) => (type ? type + _.capitalize(field) : field), 'message')
}

export const edit = (
  type,
  {
    getPk = function (type) {
      return this.data[type].id
    },
    namespacedErrors = false,
    errorsKey = 'errors',
  } = {},
) =>
  async function (property, value) {
    const key = `edit${type}`
    const { ok, errors } = _.at(
      await this.$apollo.mutate(
        schema(type)({
          [property]: value,
          pk: getPk.call(this, type),
        }),
      ),
      ['data', key],
    )
    _.set(this, namespacedErrors ? [errorsKey, key] : [errorsKey], ok ? {} : convertErrors(errors))
  } |> _.curry // this curry makes using this function inside of vue components easier

export const create = (
  type,
  parentType,
  {
    namespacedErrors = false,
    onSuccess = _.noop,
    getVars = _.stubObject,
    getQueryVariables = getRouteParams,
    errorsKey = 'errors',
  } = {},
) =>
  async function () {
    const key = `create${type}`
    const { ok, errors } = _.at(
      await this.$apollo.mutate(
        schema(type)(
          _.assign(
            parentType ? { [parentType]: this.data[parentType].id } : {},
            getVars.call(this),
          ),
          getQueryVariables.call(this),
        ),
      ),
      ['data', key],
    )
    _.set(this, namespacedErrors ? [errorsKey, key] : [errorsKey], ok ? {} : convertErrors(errors))
    if (ok) onSuccess.call(this)
  }

export const del = (type) =>
  function (id, { getQueryVariables = getRouteParams } = {}) {
    this.$apollo.mutate(schema(type)(id, getQueryVariables.call(this)))
  }

export const data = ({ errorKeys = [], errorsKey = 'errors', loadingKey = 'loading' } = {}) => ({
  // sometimes the errors object needs to be nested
  [errorsKey]: errorKeys |> toObject(_.identity, _.stubObject),
  [loadingKey]: 0,
})

export const apollo = (
  type,
  { getQueryVariables = getRouteParams, loadingKey = 'loading' } = {},
) => ({
  loadingKey,
  query: schema(type),
  variables: getQueryVariables,
  update: _.identity,
})

export const drag = (type) =>
  function ({ oldIndex, newIndex }) {
    this.$apollo.mutate(
      schema(type)(
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
