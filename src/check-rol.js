'use strict'

const Promise = require('bluebird')


function checkRol (config, req) {
  return new Promise((done, reject)=> {
    
    const client_rol = req.decoded.rol.toLowerCase()

    config.forEach((valid_rol, index) => {
      
      // Only is not public roles
      if(valid_rol.rol != 'public') {
        
        if(client_rol === valid_rol.rol) {
          done(valid_rol)
        } else if(index === config.length - 1) {
          // Not have valid rol
          reject(`You do not have an authorized profile: ${client_rol}`)
        }
      } 
    })

  })
}


module.exports = checkRol
