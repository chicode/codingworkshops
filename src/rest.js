import _ from 'lodash/fp'
import pathToRegexp from 'path-to-regexp'

const mapKey = _.map.convert({ cap: false })
const mapValuesKey = _.mapValues.convert({ cap: false })

const generateReq = (root, defaultOptions) => (uri, options) => {
  return fetch(
    root + uri,
    _.mergeAll([
      options,
      defaultOptions,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      },
    ]),
  )
}

const generateMethod = (req, name, method, path, prepareBody, processResult) => {
  const makeReq = async (path, method, body) => {
    const res = await req(path, {
      method,
      body: prepareBody(body, { path, method, name }) |> JSON.stringify,
    })
    const text = await res.text()
    let result
    if (text.length) {
      try {
        result = JSON.parse(text)
      } catch (e) {
        throw new Error('Invalid JSON returned from method ' + name)
      }
    } else {
      result = {}
    }
    return processResult(result, { path, method, name, res })
  }

  // if path has params
  if (pathToRegexp.parse(path).length > 1) {
    const toPath = pathToRegexp.compile(path)
    return (pathParams, body) => {
      if (!pathParams) throw new Error(`Missing path params at ${path}`)
      else if (method !== 'GET' && method !== 'DELETE' && !body) {
        throw new Error(`Missing body at ${path}`)
      }
      return makeReq(toPath(pathParams), method, body)
    }
  } else {
    return (body) => {
      return makeReq(path, method, body)
    }
  }
}

export default function prepare ({
  root,
  endpoints,
  defaultOptions = {},
  prepareBody = _.identity,
  processResult = _.identity,
}) {
  const req = generateReq(root, defaultOptions)

  const methods =
    endpoints
    |> mapKey(
      (paths, method) =>
        paths
        |> mapValuesKey((path, name) =>
          generateMethod(req, name, method, path, prepareBody, processResult),
        ),
    )
    |> _.mergeAll

  function install (Vue) {
    Object.defineProperty(Vue.prototype, '$methods', {
      get () {
        return methods
      },
    })

    Vue.mixin({
      data () {
        return this.$options.$rest
          ? {
            $rest: {
              loading: false,
            },
          }
          : {}
      },

      created () {
        init.call(this)
      },
    })
  }

  return { methods, install }
}

function init () {
  let rest = this.$options.rest
  if (!rest) return

  Object.defineProperty(this, '$rest', {
    get: () => this.$data.$rest,
    enumerable: true,
    configurable: true,
  })

  rest
    |> _.keys
    |> _.forEach((key) => {
      this.$set(this.$rest, key, null)
    })
  this.$rest.loading = true

  const reqOpts =
    rest
    |> _.values
    |> _.map((val) => {
      if (_.isFunction(val)) val = val.call(this)
      if (_.isArray(val)) return { name: val[0], opts: val[1] }
      return { name: val }
    })

  const reqs =
    reqOpts
    |> _.map(({ name, opts }) => {
      if (!(name in this.$methods)) throw new Error(`Method ${name} is undefined`)
      return this.$methods[name](opts)
    })
  Promise.all(reqs).then((res) => {
    res
      |> _.zip(rest |> _.keys)
      |> _.forEach(([key, result]) => {
        this.$rest[key] = result
      })
    this.$rest.loading = false
  })
}
