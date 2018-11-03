import _ from 'lodash/fp'
import * as schemaObject from '@/graphql/schema.gql'

export function schema (key) {
  if (!schemaObject[key]) {
    throw new Error(`GraphQL type ${key} does not exist!`)
  }
  return schemaObject[key]
}

// because apollo...um...does not currently export fragments along with mutations and queries. nice.
export function fragment (name) {
  return {
    kind: 'Document',
    definitions: [schemaObject.definitions |> _.find(['name.value', name])],
  }
}

export const generateCreate = (type, propertyPath) => (variables, queryVariables = {}) => (
  proxy,
  { data },
) => {
  if (!data) return
  // first value of property path is always the queryname
  const queryName = propertyPath[0] |> _.capitalize

  const params = {
    query: schema(queryName),
    variables: queryVariables,
  }
  proxy.writeQuery({
    ...params,
    data: _.update(
      proxy.readQuery(params),
      propertyPath,
      _.concat({ ...variables, __typename: type }), // TODO figure out id
    ),
  })
}

export const generateEdit = (type) => (variables) => (proxy, { data }) => {
  if (!data) return

  const params = {
    // Apollo ids are type:id for some reason
    id: type + ':' + variables.pk,
    fragment: fragment(type + 'F'), // Fragment names end with F
    fragmentName: type + 'F',
  }
  proxy.writeFragment({
    ...params,
    data: _.assign(proxy.readFragment(params), variables),
  })
}

export const generateDelete = (propertyPath) => (variables, queryVariables = {}) => (
  proxy,
  { data },
) => {
  if (!data) return
  const queryName = propertyPath[0] |> _.capitalize

  const params = {
    query: schema(queryName),
    variables: queryVariables,
  }
  proxy.writeQuery({
    ...params,
    data: _.update(
      proxy.readQuery(params),
      propertyPath,
      _.filter((value) => value.id !== variables.pk),
    ),
  })
}

export const generateMutation = (mutationName, update = _.noop) => (
  variables,
  ...updateVariables
) => ({
  mutation: schema(mutationName),
  variables,
  update: update(variables, ...updateVariables),
})

export const generateCRUD = (type, propertyPath) => ({
  ['create' + type]: generateMutation('Create' + type, generateCreate(type, propertyPath)),
  ['edit' + type]: generateMutation('Edit' + type, generateEdit(type)),
  ['delete' + type]: generateMutation('Delete' + type, generateDelete(propertyPath)),
})
