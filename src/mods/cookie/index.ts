import { deleteCookie, getCookie, setCookie } from "./Cookie"

export const Cookie = () => {
  const set = setCookie
  const get = getCookie
  const del = deleteCookie

  return {
    set,
    get,
    del,
  }
}
