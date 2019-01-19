import { applyMiddleware, createStore } from 'redux'
import {createLogger} from 'redux-logger'
const logger = createLogger()

const initialStore = (reducer) => createStore(
  reducer,
  applyMiddleware(logger)
)

export default initialStore