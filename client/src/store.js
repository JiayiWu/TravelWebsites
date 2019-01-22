import { fromJS } from 'immutable'
import { applyMiddleware, createStore } from 'redux'
import {createLogger} from 'redux-logger'
import reduxThunk from 'redux-thunk'
const logger = createLogger({
  stateTransformer: (state) => state ? fromJS(state).toJS() : null
})

const initialStore = (reducer) => createStore(
  reducer,
  applyMiddleware(reduxThunk, logger)
)

export default initialStore