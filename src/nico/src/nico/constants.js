import _ from 'lodash/fp'

export const FUNCTIONS = [
  {
    name: 'User',
    description: 'You define these functions to tell nico how to run your game.',
    functions: [
      {
        name: 'init',
        parameters: [],
        description: 'Contains any code that you should run in the very beginning.',
      },
      {
        name: 'update',
        parameters: [],
        description:
          'Contains any code that checks for inputs and updates variables, like moving the player.',
      },
      {
        name: 'draw',
        parameters: [],
        description: 'Contains any code that draws the actual game.',
      },
    ],
  },
  {
    name: 'Graphics',
    description: 'You can use these functions to draw to the screen.',
    functions: [
      {
        name: 'sprite',
        parameters: [
          { name: 'i', type: 'sprite' },
          { name: 'x', type: 'num' },
          { name: 'y', type: 'num' },
        ],
        description:
          'Draws an 8x8 sprite given its index (the number in the top left corner of every grid square) and coordinates.',
      },
      {
        name: 'rect',
        parameters: [
          { name: 'x', type: 'num' },
          { name: 'y', type: 'num' },
          { name: 'w', type: 'num' },
          { name: 'h', type: 'num' },
        ],
        description: 'Draw a rectangle given its coordinates and size.',
      },
      {
        name: 'point',
        parameters: [{ name: 'x', type: 'num' }, { name: 'y', type: 'num' }],
        description: 'Draws a point given its coordinates.',
      },
      {
        name: 'line',
        parameters: [
          { name: 'x0', type: 'num' },
          { name: 'y0', type: 'num' },
          { name: 'x1', type: 'num' },
          { name: 'y1', type: 'num' },
        ],
        description: 'Draws a line from point 0 to point 1.',
      },
      {
        name: 'text',
        parameters: [
          { name: 'text', type: 'str' },
          { name: 'x', type: 'num' },
          { name: 'y', type: 'num' },
        ],
        description: 'Draws some text given its coordinates.',
      },
      {
        name: 'tilemap',
        parameters: [],
        description: 'Draws the tilemap.',
      },
    ],
  },
  {
    name: 'Keyboard',
    description: 'You can use these functions to process the keyboard.',
    functions: [
      {
        name: 'getKeys',
        parameters: [],
        description:
          'Returns a dictionary of all the keyboard keys and whether they are pressed or not.',
      },
      {
        name: 'keyDown',
        parameters: [{ name: 'key', type: 'key' }],
        description: 'Returns whether a key is down.',
      },
      {
        name: 'keyUp',
        parameters: [{ name: 'key', type: 'key' }],
        description: 'Returns whether a key is up.',
      },
      {
        name: 'keyPressed',
        parameters: [{ name: 'key', type: 'key' }],
        description: 'Returns whether a key was pressed and then immediately released.',
      },
    ],
  },
  {
    name: 'Mouse',
    description: 'You can use these functions to process the mouse.',
    functions: [
      {
        name: 'getButtons',
        parameters: [],
        description:
          'Returns a dictionary of all the mouse buttons and whether they are pressed or not.',
      },
      {
        name: 'buttonDown',
        parameters: [{ name: 'button', type: 'button' }],
        description: 'Returns whether a button is down.',
      },
      {
        name: 'buttonUp',
        parameters: [{ name: 'button', type: 'button' }],
        description: 'Returns whether a button is up.',
      },
      {
        name: 'buttonPressed',
        parameters: [{ name: 'button', type: 'button' }],
        description: 'Returns whether a button was pressed and then immediately released.',
      },
    ],
  },
  {
    name: 'Tilemap',
    description: 'You can use these functions to work with the tilemap',
    functions: [
      {
        name: 'hasFlag',
        parameters: [
          { name: 'flag', type: 'str' },
          { name: 'x', type: 'num' },
          { name: 'y', type: 'num' },
        ],
        description: 'Returns whether a tile has the flag. Flags are indexed starting with 0.',
      },
      {
        name: 'getTile',
        parameters: [{ name: 'x', type: 'num' }, { name: 'y', type: 'num' }],
        description: 'Returns the index of the sprite of a tile given its coordinates.',
      },
      {
        name: 'changeTile',
        parameters: [
          { name: 'i', type: 'sprite' },
          { name: 'x', type: 'num' },
          { name: 'y', type: 'num' },
        ],
        description: 'Changes the sprite at a tile given its coordinates.',
      },
    ],
  },
].reverse()
// reverse is because the sections appear in reverse order due to the rotation

export const FUNCTIONS_ONLY =
  FUNCTIONS |> _.filter(section => section.name !== 'User') |> _.flatMap('functions')

export const FUNCTIONS_BARE = FUNCTIONS_ONLY |> _.map('name')
