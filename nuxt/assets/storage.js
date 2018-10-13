let localStorageAvailable

function storageCheck () {
	if (typeof localStorage === 'object') {
	  try {
	    localStorage.setItem('localStorage', 1)
	    localStorage.removeItem('localStorage')
	    localStorageAvailable = true
	  } catch (e) {
	    localStorageAvailable = false
	    console.log('LocalStorage is unavailable. Reverting to Cookies as a fallback.')
	  }
	}
	else localStorageAvailable = false
}

function set (key, value) {
	if (localStorageAvailable === undefined) storageCheck()
	if (localStorageAvailable) localStorage.setItem(key, value)
	else setCookie(key, value)
}

function remove (key) {
	if (localStorageAvailable === undefined) storageCheck()
	if (localStorageAvailable) localStorage.removeItem(key)
	else setCookie(key, '', true)
}

function get (key) {
	if (localStorageAvailable === undefined) storageCheck()
	if (localStorageAvailable) return localStorage.getItem(key)
	else return getCookie(key)
}

function getCookie(key) {
  const name = key + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ')
      c = c.substring(1)
    if (c.indexOf(name) == 0)
      return c.substring(name.length, c.length)
  }
  return ''
}

function setCookie(key, value, remove = false) {
  const d = new Date()
  d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000) * (remove ? -1 : 1))
  const expires = 'expires=' + d.toUTCString()
  document.cookie = key + '=' + value + ';' + expires + ';path=/'
}

export default {
	set: set,
	remove: remove,
	get: get,
}
