import API from '../utils/API'
import messageHandler from '../utils/messageHandler'
export const SET_BASIC = 'SET_BASIC'
export const setUserInfo = (basicInfo) => (dispatch) => {
  return Promise.resolve().then(() => {
    localStorage.setItem('userid', basicInfo.id)
    dispatch({
      type: SET_BASIC,
      payload: basicInfo,
    })
  })
}

export const LOGOUT = 'LOGOUT'
export const logout = () => (dispatch) => {
  API.query('/account/logout', {
    options: {
      method: 'POST'
    }
  }).then(messageHandler).then((json) => {
    if (json.code === 0) {
      dispatch({
        type: LOGOUT,
        payload: {}
      })
    }
  })
}
