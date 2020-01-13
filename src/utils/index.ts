export const promisify = (fnWithCallback: (...args: any) => void) =>
    (...args: any) =>
        new Promise((resolve, reject) =>
            fnWithCallback(
                ...args,
                (err: Error, result: any) => {
                    resolve(result);
                    reject(err);
                }
            )
        )

export function debounce(fn: (...args: any) => any, ms: number) {
    let timer: any;

    return (...args: any) => {
        clearTimeout(timer);
        
        timer = setTimeout(() => {
            fn(...args);
        }, ms);
    }
}

export function get(state: any, exp: string, defaultBack = undefined) {
    if (state === undefined || state === null) {
      return state
    }
  
    const keys = exp.split(/[[\].]/g).filter(key => key !== '')
    const len = keys.length
    let value = state
  
    for (let i = 0; i < len; i++) {
      value = value[keys[i]]
  
      if (value === undefined) {
        return defaultBack
      }
    }
  
    return value
  }
  
export function color16() {//十六进制颜色随机
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
    return color;
}

export const objectValueFilter = (obj: any, filters = ['', null, undefined]) => {
    let handler: (v: any) => boolean;
    let reverse = false
  
    if (Array.isArray(filters)) {
      const fakeSet = new Set(filters)
  
      handler = fakeSet.has.bind(fakeSet)
      reverse = true
    } else if (typeof filters === 'function') {
      handler = filters
    }
  
    return Object.entries(obj).reduce((ret: any, [k, v]) => {
      if (reverse) {
        if (!handler(v)) {
          ret[k] = v
        }
      } else {
        if (handler(v)) {
          ret[k] = v
        }
      }
  
      return ret
    }, {})
  }
