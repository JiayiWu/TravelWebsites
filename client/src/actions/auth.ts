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

export const UPDATE_BASIC = 'UPDATE_BASIC'
export const updateBasic = (updateInfo: {logoUrl?: string, mail?: string, mobile?: string, name?: string, password?: string}) => (dispatch) => {
  return API.query('/user/update', {
    options: {
      method: 'POST',
      body: JSON.stringify(updateInfo)
    }
  }).then(messageHandler).then((json) => {
    if (json.code === 0) {
      dispatch({
        type: UPDATE_BASIC,
        payload: updateInfo,
      })
    }
    return json
  })
}

export const UPDATE_APPLY = 'UPDATE_APPLY'
export const updateApply = (updateInfo: {attachmentUrl?: string, context?: string}) => (dispatch) => {
  return API.query('/user/application/update', {
    options: {
      method: 'POST',
      body: JSON.stringify(updateInfo)
    }
  }).then(messageHandler).then((json) => {
    if (json.code === 0) {
      dispatch({
        type: UPDATE_APPLY,
        payload: updateInfo,
      })
    }
    return json
  })
}

export const fetchBasicInfo = () => (dispatch) => {
  return API.query('/user/info', {}).then(messageHandler).then((json) => {
    if (json.code === 0) {
      dispatch({
        type: SET_BASIC,
        payload: json.data
      })
    }
  })
}

export const SET_APPLY_INFO = 'SET_APPLY_INFO'
export const fetchApplyInfo = () => (dispatch) => {
  return API.query('/user/application/info', {}).then(messageHandler).then((json) => {
    if (json.code === 0) {
      dispatch({
        type: SET_APPLY_INFO,
        payload: json.data,
      })
    }
  })
}

export const applyVerify = (applierId, state) => (dispatch) => {
  return API.query(`/admin/application/authUser`, {
    searchParams: {
      applierId,
      state,
    },
    options: {
      method: 'POST',
    }
  })
}
