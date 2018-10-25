export const LANGUAGES = { javascript: 0, fsharp: 1 }

export const FUNCTIONS = [
  'rect',
  'sprite',
  'point',
  'line',
  'text',
  'tilemap',
  'getKeys',
  'keyDown',
  'keyUp',
  'keyPressed',
  'getButtons',
  'buttonDown',
  'buttonUp',
  'buttonPressed',
  'hasFlag',
  'getTile',
  'changeTile',
]

export const TEMPLATES = [
  `function init () {
  // initialize variables here
}

function update () {
  // respond to player inputs and update game state here
}

function draw () {
  // draw your game here
}`,
  `let init () =
  // initialize variables here

let update () =
  // respond to player inputs and update game state here

let draw () =
  // draw your game here`,
]

export const BOOKLET_SECTIONS = [
  {
    title: 'User functions',
    description: 'You define these functions to tell nico how to run your game.',
    functions: [
      {
        code: 'init()',
        description: 'Contains any code that you should run in the very beginning.',
      },
      {
        code: 'update()',
        description:
          'Contains any code that checks for inputs and updates variables, like moving the player.',
      },
      {
        code: 'draw()',
        description: 'Contains any code that draws the actual game.',
      },
    ],
  },
  {
    title: 'Graphics',
    description: 'You can use these functions to draw to the screen.',
    functions: [
      {
        code: ['sprite(i, x, y)', 'sprite i x y'],
        description:
          'Draws an 8x8 sprite given its index (the number in the top left corner of every grid square) and coordinates.',
      },
      {
        code: ['rect(x, y, w, h)', 'rect x y w h'],
        description: 'Draw a rectangle, given its coordinates and size.',
      },
    ],
  },
].reverse()
// reverse is because the sections appear in reverse order
// due to the rotation
