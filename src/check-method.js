'use strict'

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

      if(valid_method === req_method) {
        // Iterate if Exist a action type $variable
        validActions.forEach(action => {
          if(action[0] === '$') {

            //validate if this variable exist in req.decode
            try {
              const act = action.substring(1)
              const req_param = req.params[act]

              if(!decoded[act] || req_param !== decoded[act]) {
                reject(`You do not have access to this: ${action}`)
              }
            } catch (err) {}
          }

          return done()
        })
      } else if(index === validActions.length-1) {
        reject(`You do not have access to this `)
      }
     
    })

  })
}

module.exports = checkMethod
