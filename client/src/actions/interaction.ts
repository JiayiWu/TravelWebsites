import API from '../utils/API'
import messageHandler from '../utils/messageHandler'

export const follow = (userId) => () => {
  return API.query(`/interaction/concern/${userId}`, {
    options: {
      method: 'POST'
    }
  }).then(messageHandler)
}

export const unFollow = (userId) => () => {
  return API.query(`/interaction/unConcern/${userId}`, {
    options: {
      method: 'DELETE'
    }
  }).then(messageHandler)
}