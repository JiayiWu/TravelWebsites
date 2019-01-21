import * as React from 'react'
import { message } from 'antd'
const messageHandler = (json) => {
  if (json.code === 0) {
    return json
  } else {
    message.error(json.data)
    return json
  }
  
}

export default messageHandler