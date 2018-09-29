const firstValue = (obj) => Object.values(obj)[0]

export const generateCreate = (type, item, queryKey, query, variables = {}) => (
  proxy,
  { data },
) => {
  if (firstValue(data).ok) {
    proxy.writeQuery({
      query,
      variables,
      data: {
        [queryKey]: [
          ...proxy.readQuery({ query, variables })[queryKey],
          { ...item, __typename: type },
        ],
      },
    })
  }
}

export const generateEdit = (type, item, fragment) => (proxy) => {
  // Apollo ids are type:id for some reason
  const id = type + ':' + item.pk
  proxy.writeFragment({
    id,
    fragment,
    data: { ...proxy.readFragment({ id, fragment }), ...item },
  })
}

export const generateDelete = (item, queryKey, query, variables = {}) => (proxy) => {
  proxy.writeQuery({
    query,
    variables,
    data: {
      // prettier-ignore
      [queryKey]: proxy
        .readQuery({ query, variables })[queryKey]
        .filter((value) => value.id !== item.pk),
    },
  })
}
