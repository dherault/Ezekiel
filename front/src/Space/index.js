import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import run5D from './run5D'
import run4D from './run4D'

function Space() {
  const [in5D, setIn5D] = useState(true)
  const [parentId, setParentId] = useState(null)
  const bodies = Object.values(useSelector(s => s.bodies)).filter(body => body.parentId === parentId)

  function render5D() {
    return <FithDimension bodies={bodies} />
  }

  function render4D() {
    return <FourthDimension bodies={bodies} />
  }

  return (
    <Box className="w100vw h100vh">
      <Box
        position="absolute"
        top={0}
        left={0}
        p={2}
      >
        <Typography variant="h2">
          {in5D ? '5D' : '4D'}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setIn5D(in5D => !in5D)}
        >
          {in5D ? '4D' : '5D'}
        </Button>
      </Box>
      {in5D ? render5D() : render4D()}
    </Box>
  )
}

function FithDimension({ bodies }) {
  const canvasRef = useRef()

  useEffect(() => {
    if (!canvasRef.current) return

    run5D(canvasRef.current, bodies)
  }, [bodies])

  return (
    <>
      <Box
        p={2}
        position="absolute"
        bottom={0}
        left={0}
      >
        <pre>
          {JSON.stringify(bodies, null, 2)}
        </pre>
      </Box>
      <canvas
        ref={canvasRef}
        className="w100vw w100vh"
      />
    </>
  )
}

function FourthDimension({ bodies }) {
  const divRef = useRef()

  useEffect(() => {
    if (!divRef.current) return

    run4D(divRef.current, bodies)
  }, [bodies])

  return (
    <>
      <Box
        p={2}
        position="absolute"
        bottom={0}
        left={0}
      >
        <pre>
          {JSON.stringify(bodies, null, 2)}
        </pre>
      </Box>
      <div
        ref={divRef}
        className="w100vw w100vh"
      />
    </>
  )
}

export default Space
