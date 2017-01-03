const Promise = require('bluebird')


function checkRol (rolesConfig, req) {
  return new Promise((done, reject)=> {
    const clientRol = req.decoded.rol.toLowerCase()
    const validRoles = rolesConfig.filter(rol => rol.rol === clientRol)

    if(validRoles.length < 0) {
      // Invalid rol
      reject(`You do not have an authorized profile: ${clientRol}`)
    } else {
      // Have a valid rol
      done(validRoles[0])
    }

  })
}


module.exports = checkRol
