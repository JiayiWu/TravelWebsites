import { ROUTER_CHANGE } from '../actions/route'
import { fromJS } from 'immutable'
import history from '../utils/history'

const initialState = fromJS({
  url: ''
})

const routeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROUTER_CHANGE:
      history.push(action.payload)
      return state.set('url', action.payload)
    default:
      return state
  }
}

export default routeReducer