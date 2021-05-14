import { createReducer } from '@reduxjs/toolkit'

import {
  _reset,
  _set,
  _step,
} from '../actions'

const localities = createReducer(1,
  {
    [_set]: (state, { payload }) => payload.localities || state,
    [_reset]: () => ({}),
    [_step]: state => state + 1,
  },
)

export default localities
