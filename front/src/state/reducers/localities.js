import { createReducer } from '@reduxjs/toolkit'

import {
  createLocality,
  set,
} from '../actions'

const localities = createReducer({},
  {
    [set]: (state, { payload }) => payload.localities || state,
    [createLocality]: (state, { payload }) => ({ ...state, [payload.id]: payload }),
  },
)

export default localities
