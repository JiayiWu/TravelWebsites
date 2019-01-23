import * as React from 'react'
import 'whatwg-fetch'

interface paramProps {
  searchParams?: any, // GET params
  options?: {
    method?: string, // GET / POST, default GET
    body?: any, // POST
    headers?: any, 
  }
}

// const serverOrigin = 'http://192.168.31.139:8181'
export const serverOrigin = 'http://119.29.157.178:8181' // 线上地址

const query = (url, params: paramProps) => {
  const { searchParams, options } = params
  // if (!url) {
  //   return null
  // }

  const realUrl = searchParams ? Object.keys(searchParams).reduce((str, key) => {
    if (str === url) {
      return str + '?' + key + '=' + searchParams[key]
    } else {
      return str + '&' + key + '=' + searchParams[key]
    }
  }, url) : url
  if (options && options.method === 'POST') {
    // POST 请求
    return fetch(serverOrigin + realUrl, { 
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      ...options
    }).then((res) => res.json()).then((res) => {
      return res
    })
  } else {
    // 默认GET请求
    return fetch(serverOrigin + realUrl, { credentials: 'include' }).then((res) => res.json())
  }
}

export default {
  query
}