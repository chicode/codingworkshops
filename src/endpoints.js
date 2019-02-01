export default {
  endpoints: {
    GET: {
      users: '/users',
      user: '/users/:user',

      workshops: '/workshops',
      workshop: '/workshops/:workshop',

      lesson: '/workshops/:workshop/:lesson',

      projects: '/projects',
      userProjects: '/projects/:user',
      userProject: '/projects/:user/:project',
    },
    POST: {
      login: '/sessions',

      me: '/users/me',
      createUser: '/users',

      createWorkshop: '/workshops',
      loadWorkshop: '/workshops/:workshop/load',

      createProject: '/projects',
    },
    PATCH: {
      updateWorkshop: '/workshops/:workshop',

      updateProject: '/projects/:project',
    },
    DELETE: {
      deleteWorkshop: '/workshops/:workshop',

      deleteProject: '/projects/:project',
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
