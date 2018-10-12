const firstValue = (obj) => Object.values(obj)[0]

export const generateCreate = (
  type,
  item,
  queryKey,
  query,
  queryVariables = {},
  nestedProperty = null,
) => (proxy, { data }) => {
  if (!firstValue(data).ok) return
  console.log(type, item, queryKey, query)

  const newData = proxy.readQuery({ query, variables: queryVariables })[queryKey]
  const newItem = { ...item, __typename: type, id: firstValue(data).pk }
  if (nestedProperty) {
    newData[nestedProperty].push(newItem)
  } else {
    newData.push(newItem)
  }
  proxy.writeQuery({
    query,
    variables: queryVariables,
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
      fragmentName: type,
      data: { ...proxy.readFragment({ id, fragment, fragmentName: type }), ...item },
    })
  }
}

export const generateDelete = (
  item,
  queryKey,
  query,
  queryVariables = {},
  nestedProperty = null,
) => (proxy) => {
  let newData = proxy.readQuery({ query, variables: queryVariables })[queryKey]
  if (nestedProperty) {
    newData[nestedProperty] = newData[nestedProperty].filter((value) => value.id !== item.pk)
  } else {
    newData = newData.filter((value) => value.id !== item.pk)
  }
  proxy.writeQuery({
    query,
    variables: queryVariables,
    data: {
      [queryKey]: newData,
    },
  })
}
