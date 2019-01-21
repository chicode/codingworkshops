export default {
  endpoints: {
    GET: {
      users: '/users',
      user: '/users/:user',
      workshops: '/workshops',
      workshop: '/workshops/:workshop',
      lesson: '/workshops/:workshop/:lesson',
    },
    POST: {
      me: '/users/me',
      createUser: '/users',
      createWorkshop: '/workshops',
      login: '/sessions',
      loadWorkshop: '/workshops/:workshop/load',
    },
    PATCH: {
      updateWorkshop: '/workshops/:workshop',
    },
    DELETE: {
      deleteWorkshop: '/workshops/:workshop',
    },
  },
  prepareBody (body, { method }) {
    if (method !== 'GET') {
      return { ...body, jwt: localStorage.getItem('jwt') }
    }
    return body
  },
  processResult (result, { res }) {
    result.ok = res.status === 200
    return result
  },
}
