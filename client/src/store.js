import { fromJS } from 'immutable'
import { applyMiddleware, createStore } from 'redux'
import {createLogger} from 'redux-logger'
const logger = createLogger({
  stateTransformer: (state) => state ? fromJS(state).toJS() : null
})

const initialStore = (reducer) => createStore(
  reducer,
  applyMiddleware(logger)
)

export default initialStore