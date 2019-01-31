import { serverOrigin } from '../utils/API'
import messageHandler from '../utils/messageHandler'

const uploadFile = (file) => {
  let formData = new FormData()
  formData.append('file', file)
  return fetch(serverOrigin + '/file/upload', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  }).then((res) => res.json()).then(messageHandler)
}

export default {
  uploadFile
}