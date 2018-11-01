export const FUNCTIONS_BARE = [
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
        parameters: ['i', 'x', 'y'],
        description:
          'Draws an 8x8 sprite given its index (the number in the top left corner of every grid square) and coordinates.',
      },
      {
        name: 'rect',
        parameters: ['x', 'y', 'w', 'h'],
        description: 'Draw a rectangle given its coordinates and size.',
      },
      {
        name: 'point',
        parameters: ['x', 'y'],
        description: 'Draws a point given its coordinates.',
      },
      {
        name: 'line',
        parameters: ['x0', 'y0', 'x1', 'y1'],
        description: 'Draws a line from point 0 to point 1.',
      },
      {
        name: 'text',
        parameters: ['text', 'x', 'y'],
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
        parameters: ['key'],
        description: 'Returns whether a key is down.',
      },
      {
        name: 'keyUp',
        parameters: ['key'],
        description: 'Returns whether a key is up.',
      },
      {
        name: 'keyPressed',
        parameters: ['key'],
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
        parameters: ['button'],
        description: 'Returns whether a button is down.',
      },
      {
        name: 'buttonUp',
        parameters: ['button'],
        description: 'Returns whether a button is up.',
      },
      {
        name: 'buttonPressed',
        parameters: ['button'],
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
        parameters: ['flag', 'x', 'y'],
        description: 'Returns whether a tile has the flag. Flags are indexed starting with 0.',
      },
      {
        name: 'getTile',
        parameters: ['x', 'y'],
        description: 'Returns the index of the sprite of a tile given its coordinates.',
      },
      {
        name: 'changeTile',
        parameters: ['i', 'x', 'y'],
        description: 'Changes the sprite at a tile given its coordinates.',
      },
    ],
  },
].reverse()
// reverse is because the sections appear in reverse order due to the rotation
