import { createReducer } from '@reduxjs/toolkit'

import {
  _updateBody,
} from '../actions'

const bodies = createReducer({},
  {
    [_updateBody]: (state, { payload }) => ({ ...state, [payload.id]: payload }),
  },
)

export default bodies
