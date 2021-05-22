import { createReducer } from '@reduxjs/toolkit'

import {
  _updateBodies,
  _updateBody,
} from '../actions'

const bodies = createReducer({},
  {
    [_updateBody]: (state, { payload }) => ({ ...state, [payload.id]: payload }),
    [_updateBodies]: (state, { payload }) => {
      const nextState = { ...state }

      payload.forEach(body => {
        nextState[body.id] = body
      })

      return nextState
    },
  },
)

export default bodies
