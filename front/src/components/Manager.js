import './Manager.css'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { createLocality, step } from '../localities'

function Manager() {
  const localities = useSelector(s => s.localities)

  return (
    <Paper className="Manager">
      <div className="x1">
        <pre>
          {JSON.stringify(localities, null, 2)}
        </pre>
        <div className="flex-grow" />
        <TimeForm />
        <SplitLocalityForm />
      </div>
    </Paper>
  )
}

function AddLocalityForm() {
  const [mass, setMass] = useState(1)
  const [observation, setObservation] = useState(1)
  // const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()

    createLocality({
      mass,
      observation,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 y2s"
    >
      <Typography>
        Create locality
      </Typography>
      <TextField
        label="Mass"
        type="number"
        value={mass}
        onChange={event => setMass(event.target.value)}
        className="mt-1"
      />
      <TextField
        label="Observation"
        type="number"
        value={observation}
        onChange={event => setObservation(event.target.value)}
        className="mt-1"
      />
      <Button
        type="submit"
        color="primary"
        className="mt-1"
      >
        Submit
      </Button>
    </form>
  )
}

function TimeForm() {
  const time = useSelector(s => s.time)

  function handleStep() {
    step()
  }

  return (
    <div className="p-2 y2s">
      <Typography>
        Time: {time}
      </Typography>
      <Button
        color="primary"
        onClick={handleStep}
      >
        Step
      </Button>
    </div>
  )
}

function ResetForm() {
  const dispatch = useDispatch()

  function handleReset() {
    dispatch({ type: 'RESET' })
  }

  return (
    <div className="p-2 y2s">
      <Button
        color="primary"
        onClick={handleReset}
      />
    </div>
  )
}

function SplitLocalityForm() {
  const localities = useSelector(s => s.localities)
  const localitiesAsArray = Object.values(localities)
  const rootLocality = localitiesAsArray.find(l => l.parentId === 1)

  const [parentId, setParentId] = useState(rootLocality.id)
  const [mass, setMass] = useState(1)
  const [observation, setObservation] = useState(1)
  // const dispatch = useDispatch()

  useEffect(() => {
    const parentLocality = localitiesAsArray.find(l => l.id === parentId)

    if (parentLocality) {
      const children = localitiesAsArray.filter(l => l.parentId === parentId)
      const sumChildrenMass = children.reduce((mass, l) => mass + l.mass, 0)

      setMass((parentLocality.mass - sumChildrenMass) / 2)
    }
  }, [parentId, localitiesAsArray])

  function handleSubmit(event) {
    event.preventDefault()

    createLocality({
      parentId,
      mass,
      observation,
    })

    setMass(1)
    setObservation(1)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 y2s"
    >
      <Typography>
        Split locality
      </Typography>
      <TextField
        label="Parent id"
        value={parentId}
        onChange={event => setParentId(event.target.value)}
        className="mt-1"
      />
      <TextField
        label="Mass given"
        type="number"
        value={mass}
        onChange={event => setMass(event.target.value)}
        className="mt-1"
      />
      <TextField
        label="Observation"
        type="number"
        value={observation}
        onChange={event => setObservation(event.target.value)}
        className="mt-1"
      />
      <Button
        type="submit"
        color="primary"
        className="mt-1"
      >
        Submit
      </Button>
    </form>
  )
}

export default Manager
