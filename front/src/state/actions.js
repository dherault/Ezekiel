import { createAction } from '@reduxjs/toolkit'

export const _step = createAction('STEP')
export const _createLocality = createAction('CREATE_LOCALITY')
export const _updateLocality = createAction('UPDATE_LOCALITY')
export const _createSpaceLocality = createAction('CREATE_SPACE_LOCALITY')
export const _set = createAction('SET')
export const _reset = createAction('RESET')
