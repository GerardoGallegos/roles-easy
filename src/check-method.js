const Promise = require('bluebird')


/**
*  This function validate that the action is permit for this route
*  The actions can be of 3 different types such as:
*
*  [Method: "get post push delete"]
*  [Group: ".read .write" ]
*  [Variables: "$id  $uid" ]
*
* @method checkMethod
* @param {Array} validActions - Actions valid in config file, such as ['post', '.write', '.read']
* @return {Promise}
*/
function checkMethod (validActions, req) {
  return new Promise((done, reject)=> {
    const req_method = req.method.toLowerCase()
    const decoded = req.decoded

    validActions.forEach((valid_method, index)=> {
      // Validate the request's method
      if(req_method === 'post' || req_method === 'put' || req_method === 'delete') {

        // has req_method access
        if(valid_method === '.write') {

          // Iterate if Exist a action type $variable
          validActions.forEach(action => {
            if(action[0] === '$') {
              //validate if this variable exist in req.decode
              try {
                if(!decoded[action.substring(1)]) {
                  reject(`You do not have access to this: ${action}`)
                }
              } catch (err) {}
            }
          })

          // [POST PUT DELETE] ...ok
          done()
        } else if(valid_method === req_method) {
          done()
        }
      } else if(req_method === 'get') {
        if(valid_method === 'get' || valid_method === '.read') {

          // Iterate if Exist a action type $variable
          validActions.forEach(action => {
            if(action[0] === '$') {
              //validate if this variable exist in req.decode
              try {
                if(!decoded[action.substring(1)]) {
                  reject(`You do not have access to this: ${action}`)
                }
              } catch (err) {}
            }
          })

          // [GET] ...ok
          done()
        }
      } else {
        reject()
      }
      // End
      if(index + 1 === validActions.length) {
        reject()
      }
    })
  })
}

module.exports = checkMethod
