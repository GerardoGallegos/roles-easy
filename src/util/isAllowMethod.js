const Promise = require('bluebird')

function isAllowMethod(rootAccessList, method) {
  return new Promise((done, reject)=> {
    rootAccessList.forEach((rootMethod, index) => {
      // Validate the request's method
      if(method === 'post' || method === 'put' || method === 'delete') {
        // has method access

        if(rootMethod === '.write') {
          // [POST PUT DELETE] ...ok
          done()
        } else if(rootMethod === method) {
          done()
        }
      } else if(method === 'get') {
        if(rootMethod === 'get' || rootMethod === '.read') {
          // [GET] ...ok
          done()
        }
      } else {
        reject()
      }
      if(index + 1 === rootAccessList.length) {
        reject()
      }
    })
  })
}


module.exports = isAllowMethod
