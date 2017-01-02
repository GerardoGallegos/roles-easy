const Promise = require('bluebird')

/**
* This function iterates and validate access
* @method expressRoles
* @param {Object} rolesConfig - Routes and roles configuracion see Docs
* @param {Function} prevMw - If exist Executes this Mitleware before
* @param {String} valid$uid - valid uid User's uid
* @return {Promise}
*/
function isAllowMethod(rootAccessList, method, valid$uid) {
  return new Promise((done, reject)=> {
    rootAccessList.forEach((rootMethod, index) => {
      // Validate the request's method
      if(method === 'post' || method === 'put' || method === 'delete') {
        // has method access

        if(rootMethod === '.write') {
          // Exist $uid
          rootAccessList.forEach(m => {
            if(m === '$uid') {
              if(!valid$uid) {
                reject()
              }
            }
          })
          // [POST PUT DELETE] ...ok
          done()
        } else if(rootMethod === method) {
          done()
        }
      } else if(method === 'get') {
        if(rootMethod === 'get' || rootMethod === '.read') {
          // Exist $uid
          rootAccessList.forEach(m => {
            if(m === '$uid') {
              if(!valid$uid) {
                reject()
              }
            }
          })
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

// function isValidUid()


module.exports = isAllowMethod
