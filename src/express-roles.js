const check_rol = require('./check-rol')
const check_route = require('./check-route')
const check_method = require('./check-method')

/**
* This is a funcion that return express middleware
* @method expressRoles
* @param {Object} rolesConfig - Routes and roles configuracion see Docs
* @param {Function} prevMw - If exist Executes this Mitleware before
* @return {Function} Express Mitleware
*/
function expressRoles(rolesConfig, prevMw) {
  // return the express middleware
  return (req, res, next)=> {

    const i_next = () => {
      console.log('LLEGO HASTA ACA')
      middleware()
    }

    // If exist prevMw (prev middleware is executed before)
    if(prevMw) {
      return prevMw(req, res, i_next)
    }

    middleware()

    const errMsg = `Access Denied
    You don't have permission to: ${req.route.path} - ${req.method.toLowerCase()}`

    function middleware() {
      check_rol(rolesConfig, req)
        // Validates that req.decode.rol be correct
        .then( validRol => {
          return check_route(validRol, req)
        })
        // Validates that req.route.path have a valid access
        .then( validActions => {
          return check_method(validActions, req)
        })
        // Validates that req.method have a valid access
        .then(()=> {
          // OK..
          next()
        })
        .catch(err => {
          res.status(401).json({
            message: errMsg
          })
        })
    }

  }
}


module.exports = expressRoles
