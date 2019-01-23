import { 
  SET_BASIC,
  LOGOUT
} from '../actions/auth'
import { fromJS } from 'immutable'
const initialState = fromJS({
  mail: '',
  mobile: '',
  logoUrl: '',
  name: '',
  id: 0
})

const UserReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_BASIC:
      return state.merge(fromJS(action.payload))
    case LOGOUT:
      localStorage.clear()
      return state.merge(initialState)
    default:
      return state
  }
}

export default UserReducer