import { CANVAS_SIZE } from './constants'

export function getIndexFromCoords (coords) {
  return coords[1] * (CANVAS_SIZE * 4) + coords[0] * 4
}

export function getCoordsFromIndex (index) {
  return [(index % (CANVAS_SIZE * 4)) / 4, Math.floor(index / (CANVAS_SIZE * 4))]
}

function inBounds (coords) {
  return coords[0] >= 0 && coords[0] < CANVAS_SIZE && coords[1] >= 0 && coords[1] < CANVAS_SIZE
}

function getColor (data, coords) {
  const i = getIndexFromCoords(coords)
  return [data[i], data[i + 1], data[i + 2], data[i + 3]].join(',')
}

function setPixel (data, i, red, green, blue) {
  data[i] = red
  data[i + 1] = green
  data[i + 2] = blue
  data[i + 3] = 255
}
function hexToRgb (hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) throw new Error('Bucket fill color must be in hex')

  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
}

function search (data, coords, color, traversed) {
  for (const direction of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
    let newCoords = [coords[0] + direction[0], coords[1] + direction[1]]
    /*
    console.log(
      inBounds(newCoords),
      getColor(data, newCoords) === color,
      traversed.reduce(

        (acc, val) => acc && !(val[0] === newCoords[0] && val[1] === newCoords[1]),
        true,
      )
    )
    */
    if (
      // new coordinate is of the right color and has not already been added
      inBounds(newCoords) &&
      getColor(data, newCoords) === color &&
      traversed.reduce(
        (acc, val) => acc && !(val[0] === newCoords[0] && val[1] === newCoords[1]),
        true,
      )
    ) {
      traversed.push(newCoords)
      search(data, newCoords, color, traversed)
    }
  }
  return traversed
}

export default function bucketFill (data, initialCoords, color) {
  // returning a new array is necessary for vuex to detect the change
  data = data.slice()
  const [red, green, blue] = hexToRgb(color)

  const allCoords = search(data, initialCoords, getColor(data, initialCoords), [initialCoords])
  for (let coords of allCoords) {
    setPixel(data, getIndexFromCoords(coords), red, green, blue)
  }
  return data
}

// this function works by going through the canvas, and converting all true black pixels to the desired color
// this works because the black used in Nico isn't actually true black
// black is chosen as the color to draw initially because unlike every other color, the rgb of black aren't changed when it's antialiased
// only its alpha - this makes it possible to differentiate it
export function correctAntialiasing (data, color) {
  const [red, green, blue] = hexToRgb(color)
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] !== 0) {
      setPixel(data, i - 3, red, green, blue)
    }
  }
}
