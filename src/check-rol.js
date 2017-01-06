const Promise = require('bluebird')


function checkRol (rolesConfig, req) {
  return new Promise((done, reject)=> {
    
    const clientRol = req.decoded.rol.toLowerCase()

    rolesConfig.forEach((validRol, index) => {
      if(validRol.rol === 'public' || rol.rol === clientRol) {
        done(validRol)
      } else if(index === rolesConfig.length - 1) {
        // Not have valid rol
        reject(`You do not have an authorized profile: ${clientRol}`)
      }

    })

  })
}


module.exports = checkRol
