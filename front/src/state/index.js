import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { persistStorageKey } from '../configuration'

import localities from './reducers/localities'
import spaceLocalities from './reducers/spaceLocalities'

const persistConfig = {
  key: persistStorageKey,
  storage,
}

const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    localities,
    spaceLocalities,
  })),
})

store.persistor = persistStore(store)

export default store
