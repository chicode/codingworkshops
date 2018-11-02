import _ from 'lodash/fp'

// CONSTANTS: type, propertyPath
export const generateCreate = _.curry(
  (type, propertyPath, item, queryVariables = {}) => (proxy, { data }) => {
    if (!data) return
    // first value of property path is always the queryname
    const queryName = propertyPath[0] |> _.capitalize

    const params = {
      query: require('./schema.gql')[queryName],
      variables: queryVariables,
    }
    proxy.writeQuery({
      ...params,
      data: _.update(
        proxy.readQuery(params),
        propertyPath,
        _.concat({ ...item, __typename: type }), // TODO figure out id
      ),
    })
  },
)

// CONSTANTS: type
export const generateEdit = _.curry((type, itemUpdate, itemId) => (proxy, { data }) => {
  if (!data) return

  const params = {
    // Apollo ids are type:id for some reason
    id: type + ':' + itemId,
    fragment: require('./schema.gql')[type],
    fragmentName: type,
  }
  proxy.writeFragment({
    ...params,
    data: _.assign(proxy.readFragment(params), itemUpdate),
  })
})

// CONSTANTS: propertyPath
export const generateDelete = _.curry(
  (propertyPath, itemId, queryVariables = {}) => (proxy, { data }) => {
    if (!data) return
    const queryName = propertyPath[0] |> _.capitalize

    const params = {
      query: require('./schema.gql')[queryName],
      variables: queryVariables,
    }
    proxy.writeQuery({
      ...params,
      data: _.update(
        proxy.readQuery(params),
        propertyPath,
        _.filter((value) => value.id !== itemId),
      ),
    })
  },
)

export const generateMutation = (mutationName, update = _.noop) => (
  variables,
  ...updateVariables
) => ({
  mutation: require('./schema.gql')[mutationName],
  variables,
  update: update(...updateVariables),
})

export const generateCRUD = (type, propertyPath) => ({
  ['create' + type]: generateMutation('Create' + type, generateCreate(type, propertyPath)),
  ['edit' + type]: generateMutation('Edit' + type, generateEdit(type)),
  ['delete' + type]: generateMutation('Delete' + type, generateDelete(propertyPath)),
})
