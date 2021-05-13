import { createAction } from '@reduxjs/toolkit'

export const createLocality = createAction('CREATE_LOCALITY')
export const createSpaceLocality = createAction('CREATE_SPACE_LOCALITY')
export const set = createAction('SET')
export const reset = createAction('RESET')
