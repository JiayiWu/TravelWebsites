export const SET_BASIC = 'SET_BASIC'
export const setUserInfo = (basicInfo) => {
  return {
    type: SET_BASIC,
    payload: basicInfo,
  }
}