import { SET_BASIC } from '../actions/auth'
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
    default:
      return state
  }
}

export default UserReducer