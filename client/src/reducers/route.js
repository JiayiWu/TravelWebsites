import { ROUTER_CHANGE } from '../actions/route'
import { LOGOUT } from '../actions/auth'
import { fromJS } from 'immutable'
import history from '../utils/history'

const initialState = fromJS({
  url: ''
})

const routeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROUTER_CHANGE:
      history.push(action.payload.url, action.payload.state)
      // if (action.payload.state) {
      //   history.pushState(action.payload.state, 'activity')
      // }
      return state.set('url', action.payload.url).set('state', action.payload.state)
    case LOGOUT:
      history.push('/login')
      return state.set('url', '/login')
    default:
      return state
  }
}

export default routeReducer