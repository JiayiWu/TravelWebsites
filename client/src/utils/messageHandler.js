import * as React from 'react'
import { message } from 'antd'
const messageHandler = promise => {
  return promise.then((json) => {
    if (json.code === 0) {
      return json
    } else {
      message.error(json.data)
    }
  })
}

export default messageHandler