
export const ROUTER_CHANGE = 'ROUTER_CHANGE'
export const pushURL = (url) => {
  return {
    type: ROUTER_CHANGE,
    payload: url
  }
}
