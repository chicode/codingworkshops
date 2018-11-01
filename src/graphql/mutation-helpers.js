import _ from 'lodash/fp'

const firstValue = (obj) => _.values(obj)[0]

export const generateCreate = (
  type,
  item,
  query,
  queryKey,
  { queryVariables = {}, nestedProperty = null } = {},
) => (proxy, { data }) => {
  if (!firstValue(data).ok) return

  const params = {
    query,
    variables: queryVariables,
  }
  proxy.writeQuery({
    ...params,
    data: _.update(
      proxy.readQuery(params),
      nestedProperty ? [queryKey, nestedProperty] : [queryKey],
      _.concat({ ...item, __typename: type, id: firstValue(data).pk }),
    ),
  })
}

export const generateEdit = (type, item, fragment) => (proxy, { data }) => {
  if (!firstValue(data).ok) return

  const params = {
    // Apollo ids are type:id for some reason
    id: type + ':' + item.pk,
    fragment,
    fragmentName: type,
  }
  proxy.writeFragment({
    ...params,
    data: _.assign(proxy.readFragment(params), item),
  })
}

export const generateDelete = (
  item,
  query,
  queryKey,
  { queryVariables = {}, nestedProperty = null } = {},
) => (proxy, { data }) => {
  if (!firstValue(data).ok) return

  const params = {
    query,
    variables: queryVariables,
  }
  proxy.writeQuery({
    ...params,
    data: _.update(
      proxy.readQuery(params),
      nestedProperty ? [queryKey, nestedProperty] : [queryKey],
      _.filter((value) => value.id !== item.pk),
    ),
  })
}
