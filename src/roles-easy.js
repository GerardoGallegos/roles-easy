const logic = require('./logic')

/**
* This is a funcion that return express middleware
* @method expressRoles
* @param {Object} rolesConfig - Routes and roles configuracion see Docs
* @param {Function} prevMw - If exist Executes this Mitleware before
* @return {Function} Express Mitleware
*/
function expressRoles(rolesConf, prevMw) {
  // return the express middleware
  return (req, res, next)=> {

    const i_next = () => {
      logic(rolesConf, req, res, next)
    }

    // If exist prevMw (prev middleware is executed before)
    if(prevMw) {
      return prevMw(req, res, i_next)
    }

    logic(rolesConf, req, res, next)

  }
}


module.exports = expressRoles
