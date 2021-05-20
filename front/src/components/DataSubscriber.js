import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSubscription } from 'urql'

const TimeSubscription = `
  subscription TimeSubscription {
    time
  }
`

const BodySubscription = `
  subscription BodySubscription {
    body {
      id
      parentId
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

const handleTimeSubscription = (messages = [], response) => response ? response.time : null
const handleBodySubscription = (messages = [], response) => response ? response.body : null

function DataSubscriber() {
  const [timeSubscriptionResults] = useSubscription({ query: TimeSubscription }, handleTimeSubscription)
  const [physicalLocalitiesSubscriptionResults] = useSubscription({ query: BodySubscription }, handleBodySubscription)
  const dispatch = useDispatch()

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
