import theme from '../theme'

function run5D(canvas, bodies) {
  const _ = canvas.getContext('2d')

  const devicePixelRatio = window.devicePixelRatio || 1

  const canvasPixelRatio = (
    _.webkitBackingStorePixelRatio
    || _.mozBackingStorePixelRatio
    || _.msBackingStorePixelRatio
    || _.oBackingStorePixelRatio
    || _.backingStorePixelRatio
    || 1
  )

  const dpr = devicePixelRatio / canvasPixelRatio

  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr

  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`

  const width = window.innerWidth
  const height = window.innerHeight

  _.scale(dpr, dpr)

  // eslint-disable-next-line
  _.fillStyle = theme.palette.lightBlue[500]
  _.fillRect(0, 0, width, height)

  const x = 0
  const y = height / 2
  const diffX = width / 2

  _.strokeStyle = 'white'

  _.beginPath()
  _.moveTo(x, y)
  _.lineTo(width, y)
  _.stroke()

  bodies.forEach(body => {
    _.beginPath()
    _.arc(x + diffX + body.e, y, body.radius, 0, 2 * Math.PI)
    _.stroke()
  })
}

export default run5D
