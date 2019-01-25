import API from '../utils/API'
import messageHandler from '../utils/messageHandler'
export const updateBasic = (updateInfo: {logoUrl?: string, mail?: string, mobile?: string, name?: string, password?: string}) => {
  return API.query('/user/update', {
    options: {
      method: 'POST',
      body: JSON.stringify(updateInfo)
    }
  }).then(messageHandler)
}

export const fetchBasicInfo = () => {
  return API.query('/user/info', {}).then(messageHandler)
}

export const fetchApplyInfo = () => {
  return API.query('/user/application/info', {
    options: {
      method: 'POST'
    }
  }).then(messageHandler)
}