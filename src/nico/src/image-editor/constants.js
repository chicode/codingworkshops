export const GRID_SIZE = 8
export const GRID_WIDTH = 2
export const GRID_COLOR = '#000000'
export const GRID_FONT = 'bold 10px Karla'
export const GRID_NUMBER = 10

export const CANVAS_SIZE = GRID_SIZE * GRID_NUMBER
export const SCALE = 10

export const COLORS = {
  // black is not exactly black in order for the grid to be visible
  night: '#222222',
  crown: '#572956',
  rose: '#B14156',
  sunset: '#EE7B58',
  lemon: '#FFD079',
  grass: '#A0F072',
  bush: '#38B86E',
  swamp: '#276E7B',
  ocean: '#29366F',
  berry: '#405BD0',
  pool: '#4FA4F7',
  sky: '#86ECF8',
  cloud: '#F4F4F4',
  cement: '#93B6C1',
  metal: '#557185',
  coal: '#324056',
}
export const TOOLS = ['pencil', 'eraser', 'bucket', 'rectangle-select', 'circle-select']

export const SELECTION_WIDTH = 2
export const SELECTION_COLOR = 'blue'
export const SELECTION_DASH = [5, 2]

export const MIN_TOOL_WIDTH = 1
export const MAX_TOOL_WIDTH = 20

// helps get rid of stylistic elements being cut off at the edge of the canvas
// set to the max because both the grid and selection are at risk here, and accounting for the
// widest one prevents both from being cut off
export const CANVAS_PADDING = Math.max(SELECTION_WIDTH, GRID_WIDTH)
// give the user a bit more hitbox
export const CANVAS_PADDING_OUTER = 10
