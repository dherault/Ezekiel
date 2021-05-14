import { createReducer } from '@reduxjs/toolkit'

import {
  _createLocality,
  _reset,
  _set,
  _updateLocality,
} from '../actions'

const localities = createReducer({},
  {
    [_set]: (state, { payload }) => payload.localities || state,
    [_reset]: () => ({}),
    [_createLocality]: (state, { payload }) => ({ ...state, [payload.id]: payload }),
    [_updateLocality]: (state, { payload }) => ({ ...state, [payload.id]: { ...state[payload.id], ...payload } }),
  },
)

export default localities
