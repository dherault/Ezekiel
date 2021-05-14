import { createReducer } from '@reduxjs/toolkit'

import {
  _createSpaceLocality,
  _reset,
  _set,
} from '../actions'

const spaceLocalities = createReducer({},
  {
    [_set]: (state, { payload }) => payload.spaceLocalities || state,
    [_reset]: () => ({}),
    [_createSpaceLocality]: (state, { payload }) => ({ ...state, [payload.id]: payload }),
  },
)

export default spaceLocalities
