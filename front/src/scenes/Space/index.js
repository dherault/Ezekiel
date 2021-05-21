import { useEffect, useRef, useState } from 'react'
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoopIcon from '@material-ui/icons/Loop'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import run5D from './run5D'
import run4D from './run4D'

function Space() {
  const { pathname } = useLocation()
  const history = useHistory()
  const in5D = pathname.endsWith('5D')
  const bodies = Object.values(useSelector(s => s.bodies))

  function handleToggleDimension() {
    history.push(in5D ? '/space/4D' : '/space/5D')
  }

  return (
    <Box className="w100vw h100vh">
      <Box
        position="absolute"
        top={0}
        left={0}
        p={2}
      >
        <Typography
          variant="h2"
          className={in5D ? null : 'color-white'}
        >
          {in5D ? '5D' : '4D'}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={handleToggleDimension}
        >
          <LoopIcon />
        </Button>
      </Box>
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
      <Route path="/space/5D">
        <FithDimension bodies={bodies} />
      </Route>
      <Route path="/space/4D">
        <FourthDimension bodies={bodies} />
      </Route>
      <Redirect
        from="/space"
        to="/space/4D"
      />
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
    <canvas
      ref={canvasRef}
      className="w100vw w100vh"
    />
  )
}

function FourthDimension({ bodies }) {
  const divRef = useRef()
  const [updateState, setUpdateState] = useState(() => null)

  useEffect(() => {
    if (!divRef.current) return

    run4D(divRef.current)
  }, [])
  // useEffect(() => {
  //   if (!divRef.current) return

  //   const { start, stop, updateState } = run4D(divRef.current)

  //   setUpdateState(() => updateState)
  //   start()

  //   return stop
  // }, [])

  return (
    <div
      ref={divRef}
      className="w100vw w100vh"
    />
  )
}

export default Space
