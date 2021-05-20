import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import time from './reducers/time'
import bodies from './reducers/bodies'

const store = configureStore({
  reducer: combineReducers({
    time,
    bodies,
  }),
})

export default store
