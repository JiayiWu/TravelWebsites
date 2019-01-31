import API from '../utils/API'
import messageHandler from '../utils/messageHandler'

export const uploadFile = (file) => {
  let formData = new FormData()
  formData.append('file', file)
  return API.query('/file/upload', {
    options: {
      method: 'POST',
      body: formData
    }
  }).then(messageHandler)
}