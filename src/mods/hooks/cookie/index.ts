import { deleteCookie, getCookie, setCookie } from "./useCookie"

export const useCookie = () => {
  const set = setCookie
  const get = getCookie
  const del = deleteCookie

  return {
    set,
    get,
    del,
  }
}
