import { createReducer } from '@reduxjs/toolkit'

import {
  createSpaceLocality,
  set,
} from '../actions'

const spaceLocalities = createReducer({},
  {
    [set]: (state, { payload }) => payload.spaceLocalities || state,
    [createSpaceLocality]: (state, { payload }) => ({ ...state, [payload.id]: payload }),
  },
)

export default spaceLocalities
