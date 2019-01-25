import { 
  SET_BASIC,
  SET_APPLY_INFO,
  UPDATE_BASIC,
  UPDATE_APPLY,
  LOGOUT,
} from '../actions/auth'
import { fromJS } from 'immutable'
const initialState = fromJS({
  mail: '',
  mobile: '',
  logoUrl: '',
  name: '',
  id: 0,
  attachmentUrl: '',
  context: '',
})

const UserReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_BASIC:
      return state.merge(fromJS(action.payload))
    case SET_APPLY_INFO:
      return state.merge(fromJS(action.payload))
    case UPDATE_BASIC:
      return state.merge(fromJS(action.payload))
    case UPDATE_APPLY:
      return state.merge(fromJS(action.payload))
    case LOGOUT:
      localStorage.clear()
      return state.merge(initialState)
    default:
      return state
  }
}

export default UserReducer