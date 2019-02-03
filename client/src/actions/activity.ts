import API from '../utils/API'
export const attendAct = (body: { activityId: number, attachmentUrl?: string, context?: string, userId: number}) => (dispatch) => {
  return API.query('/activity/attend', {
    options: {
      method: 'POST',
      body: JSON.stringify(body)
    }
  })
}

export const quitAct = (activityId, userId) => (dispatch) => {
  return API.query(`/activity/quit/${activityId}/user/${userId}`, {
    options: {
      method: 'POST'
    }
  })
}

export const applyAct = (activityId, result) => (dispatch) => {
  return API.query(`/admin/application/check/${activityId}/result/${result}`, {
    options: {
      method: 'POST',
    }
  })
}

export const cancelAct = (activityId) => (dispatch) => {
  return API.query(`/activity/cancel/${activityId}`, {
    options: {
      method: 'POST',
    }
  })
}

export const endAct = (activityId) => (dispatch) => {
  return API.query(`/activity/end/${activityId}`, {
    options: {
      method: 'POST'
    }
  })
}

export const applyJoinAct = (activityId, userId, result) => (dispatch) => {
  return API.query(`/activity/application/check/${activityId}/user/${userId}/result/${result}`, {
    options: {
      method: 'POST'
    }
  })
}