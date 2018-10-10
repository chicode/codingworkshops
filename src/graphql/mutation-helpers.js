const firstValue = (obj) => Object.values(obj)[0]

export const generateCreate = (
  type,
  item,
  queryKey,
  query,
  variables = {},
  nestedProperty = null,
) => (proxy, { data }) => {
  if (!firstValue(data).ok) return

  const newData = proxy.readQuery({ query, variables })[queryKey]
  ;(nestedProperty ? newData[nestedProperty] : newData).push({ ...item, __typename: type })
  proxy.writeQuery({
    query,
    variables,
    data: {
      [queryKey]: newData,
    },
  })
}

export const generateEdit = (type, item, fragment) => (proxy, { data }) => {
  if (firstValue(data).ok) {
    // Apollo ids are type:id for some reason
    const id = type + ':' + item.pk
    proxy.writeFragment({
      id,
      fragment,
      data: { ...proxy.readFragment({ id, fragment }), ...item },
    })
  }
}

export const generateDelete = (item, queryKey, query, variables = {}, nestedProperty = null) => (
  proxy,
) => {
  let newData = proxy.readQuery({ query, variables })[queryKey]
  if (nestedProperty) {
    newData[nestedProperty] = newData[nestedProperty].filter((value) => value.id !== item.pk)
  } else {
    newData = newData.filter((value) => value.id !== item.pk)
  }
  proxy.writeQuery({
    query,
    variables,
    data: {
      [queryKey]: newData,
    },
  })
}
