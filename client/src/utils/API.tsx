import * as React from 'react'
import 'whatwg-fetch'

interface paramProps {
  searchParams?: any, // GET params
  options?: {
    method?: string, // GET / POST, default GET
    body?: any, // POST
  }
}

const serverOrigin = 'http://119.29.157.178:8181'

const query = (url, params: paramProps) => {
  const { searchParams, options } = params
  console.log(options, url)
  // if (!url) {
  //   return null
  // }

  const realUrl = searchParams ? searchParams.keys().reduce((str, key) => {
    if (str === url) {
      return str + '?' + searchParams[key]
    } else {
      return str + '&' + searchParams[key]
    }
  }, url) : url
  if (options && options.method === 'POST') {
    console.log(options)
    // POST 请求
    return fetch(serverOrigin + realUrl, { 
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: options.body
    }).then((res) => res.json()).then((res) => {
      console.log(res)
      return res
    })
  } else {
    // 默认GET请求
    return fetch(realUrl).then((res) => res.json())
  }
}

export default {
  query
}