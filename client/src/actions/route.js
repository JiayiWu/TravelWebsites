
export const ROUTER_CHANGE = 'ROUTER_CHANGE'
export const pushURL = (url, state={}) => {
  return {
    type: ROUTER_CHANGE,
    payload: {
      url,
      state
    }
  }
}
