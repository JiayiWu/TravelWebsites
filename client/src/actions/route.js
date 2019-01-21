
export const ROUTER_CHANGE = 'ROUTER_CHANTE'
export const pushURL = (dispatch) => (url) => {
  return dispatch({
    type: ROUTER_CHANGE,
    payload: url
  })
}
