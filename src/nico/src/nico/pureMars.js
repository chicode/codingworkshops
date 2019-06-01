import * as lisavm from '@chicode/lisa-vm'

const { native, capsule, bool, num, list } = lisavm.values

function argCheck (params, name, loc, args) {
  if (args.length !== params.length) {
    throw new lisavm.LisaError(`'${name}' expected exactly ${arity} args.`, loc)
  }
  args.forEach((arg, i) => {
    if (arg[0].type !== params[i]) {
      throw new lisavm.LisaError(`Expected argument ${i + 1} to '${name}'`, arg[1])
    }
  })
}

const shape = shape => capsule(Object.freeze({ type: 'shape', shape: Object.freeze(shape) }))

export const rect = native((loc, ...args) => {
  argCheck(['num', 'num', 'num', 'num'], 'rect', loc, args)
  const [[x], [y], [w], [h]] = args
  return shape({ type: 'rect', x, y, w, h })
})

export const point = native((loc, ...args) => {
  argCheck(['num', 'num'], 'point', loc, args)
  const [[x], [y]] = args
  return shape({ type: 'point', x, y })
})

export const sprite = native((loc, ...args) => {
  argCheck(['num', 'num', 'num'], 'sprite', loc, args)
  const [[i], [x], [y]] = args
  return shape({ type: 'sprite', i, x, y })
})

export const line = native((loc, ...args) => {
  argCheck(['num', 'num', 'num', 'num'], 'line', loc, args)
  const [[x], [y], [x1], [y1]] = args
  return shape({ type: 'line', x, y, x1, y1 })
})

export const text = native((loc, ...args) => {
  argCheck(['str', 'num', 'num'], 'text', loc, args)
  const [[text], [x], [y]] = args
  return shape({ type: 'text', text, x, y })
})

export const tilemap = native((loc, ...args) => {
  argCheck([], 'tilemap', loc, args)
  return shape({ type: 'tilemap' })
})

const pureLib = {
  rect,
  point,
  sprite,
  line,
  text,
  tilemap,
}

export default pureLib

/** @param {lisavm.values.Value} shape */
function drawShape (mars, loc, value) {
  switch (value.type) {
    case 'list':
      value.value.forEach(drawShape)
      break
    case 'capsule':
      if (value.value.type !== 'shape') {
        throw new lisavm.LisaError("'draw' must return a shape or list of shapes", loc)
      }
      const { shape } = value.value
      switch (shape.type) {
        case 'rect':
          mars.rect(shape.x.value, shape.y.value, shape.w.value, shape.h.value)
      }
      break
    case 'none':
      break
    default:
      throw new lisavm.LisaError("'draw' must return a shape or list of shapes", loc)
  }
}

export function makeExecutor (program, mars, libLevel) {
  const programScope = lisavm.initProgram()
  for (const [name, value] of Object.entries(pureLib)) {
    programScope.parent.vars[name] = value
  }
  for (const [name, value] of Object.entries(program)) {
    programScope.vars[name] = lisavm.evalExpression(programScope, value)
  }
  const init = programScope.getVar('init')
  if (!init || init.type !== 'func') {
    return {
      success: false,
      errors: [{ message: "Missing 'init' function" }],
    }
  }
  const draw = programScope.getVar('draw')
  if (!draw || draw.type !== 'func') {
    return {
      success: false,
      errors: [{ message: "Missing 'draw' function" }],
    }
  }
  const update = programScope.getVar('update')
  if (!update || update.type !== 'func') {
    return {
      success: false,
      errors: [{ message: "Missing 'update' function" }],
    }
  }
  mars.delay = 0.5
  mars.coordMulti = 8
  let state
  switch (libLevel) {
    case 1:
      return {
        success: true,
        init: () => {},
        draw: () => {
          const shapes = lisavm.callFunction(draw, null, [])
          drawShape(mars, program.draw.location, shapes)
        },
        update: () => {},
      }
    case 2:
      return {
        success: true,
        init: () => {},
        draw: () => {
          const shapes = lisavm.callFunction(draw, null, [
            [num(mars.state.mouseCoordinates[0]) / mars.coordMulti, null],
          ])
          drawShape(mars, program.draw.location, shapes)
        },
        update: () => {},
      }
    case 3:
      return {
        success: true,
        init: () => {
          state = lisavm.callFunction(init, null, [])
        },
        draw: () => {
          const shapes = lisavm.callFunction(draw, null, [[state, null]])
          drawShape(mars, program.draw.location, shapes)
        },
        update: () => {
          state = lisavm.callFunction(update, null, [
            [state, null],
            [(num(mars.state.mouseCoordinates[0]) / mars.coordMulti, null)],
          ])
        },
      }
    case 4:
      return {
        success: true,
        init: () => {
          state = lisavm.callFunction(init, null, [])
        },
        draw: () => {
          const shapes = lisavm.callFunction(draw, null, [[state, null]])
          drawShape(mars, program.draw.location, shapes)
        },
        update: () => {
          state = lisavm.callFunction(update, null, [
            [state, null],
            [
              list([
                bool(!!mars.state.keys.ArrowLeft),
                bool(!!mars.state.keys.ArrowRight),
                bool(!!mars.state.keys.ArrowUp),
                bool(!!mars.state.keys.ArrowDown),
              ]),
              null,
            ],
          ])
        },
      }

    case 6:
      mars.delay = 1000 / 20
    case 5:
      return {
        success: true,
        init: () => {
          state = lisavm.callFunction(init, null, [])
        },
        draw: () => {
          const shapes = lisavm.callFunction(draw, null, [[state, null]])
          drawShape(mars, program.draw.location, shapes)
        },
        update: () => {
          state = lisavm.callFunction(update, null, [
            [state, null],
            [{ type: 'record', value: mars.keys }],
            [
              {
                type: 'record',
                value: {
                  x: mars.state.mouseCoordinates[0] / mars.coordMulti,
                  y: mars.state.mouseCoordinates[1] / mars.coordMulti,
                  click: mars.state.buttons.left,
                },
              },
            ],
          ])
        },
      }
    default:
      return {
        success: false,
        errors: [{ message: 'invalid lib level, change the number at the top to 1-5' }],
      }
  }
}
