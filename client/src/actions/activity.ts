import API from '../utils/API'
export const attendAct = (body: { activityId: number, attachmentUrl?: string, context?: string, userId: number}) => {
  return API.query('/activity/attend', {
    options: {
      method: 'POST',
      body: JSON.stringify(body)
    }
  })
}

export const quitAct = (activityId, userId) => {
  return API.query(`/activity/quit${activityId}/user/${userId}`, {
    options: {
      method: 'POST'
    }
  })
}