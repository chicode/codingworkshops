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
  proxy.writeFragment({ id: item.id, fragment, data: { ...item, __typename: type } })
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
