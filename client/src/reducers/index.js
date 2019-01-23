import { combineReducers } from 'redux'
import { fromJS } from 'immutable'
import user from './auth'
import route from './route'

const rootReducer = combineReducers({
  user,
  route
})

export default rootReducer