export const SET_BASIC = 'SET_BASIC'
export const setUserInfo = (dispatch) => (basicInfo) => {
  return dispatch({
    type: SET_BASIC,
    payload: basicInfo,
  })
}