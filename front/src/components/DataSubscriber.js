import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSubscription } from 'urql'

const DebugSubscription = `
  subscription DebugSubscription {
    debug
  }
`

const TimeSubscription = `
  subscription TimeSubscription {
    time
  }
`

const BodySubscription = `
  subscription BodySubscription {
    body {
      id
      mass
      radius
      a
      b
      c
      d
      e
    }
  }
`

const createSubscriptionHanlder = key => (messages, response) => response ? response[key] : null

function DataSubscriber() {
  const [debugSubscriptionResults] = useSubscription({ query: DebugSubscription }, createSubscriptionHanlder('debug'))
  const [timeSubscriptionResults] = useSubscription({ query: TimeSubscription }, createSubscriptionHanlder('time'))
  const [physicalLocalitiesSubscriptionResults] = useSubscription({ query: BodySubscription }, createSubscriptionHanlder('body'))
  const dispatch = useDispatch()

  useEffect(() => {
    if (debugSubscriptionResults.data) {
      console.log(debugSubscriptionResults.data)
    }
  }, [debugSubscriptionResults.data])

  useEffect(() => {
    if (timeSubscriptionResults.data) {
      dispatch({
        type: 'SET_TIME',
        payload: timeSubscriptionResults.data,
      })
    }
  }, [timeSubscriptionResults.data, dispatch])

  useEffect(() => {
    if (physicalLocalitiesSubscriptionResults.data) {
      dispatch({
        type: 'UPDATE_BODY',
        payload: physicalLocalitiesSubscriptionResults.data,
      })
    }
  }, [physicalLocalitiesSubscriptionResults.data, dispatch])

  return null
}

export default DataSubscriber
