import { createReducer } from '@reduxjs/toolkit'

import {
  _setTime,
} from '../actions'

const time = createReducer(1,
  {
    [_setTime]: (state, { payload }) => payload,
  },
)

export default time
