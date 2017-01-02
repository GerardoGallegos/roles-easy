const getcleanAccess = require('./util/getcleanAccess')
const isAllowMethod = require('./util/isAllowMethod')

/**
* This is a funcion that return express middleware
* @method expressRoles
* @param {Object} rolesConfig - Routes and roles configuracion see Docs
* @param {Function} prevMw - If exist Executes this Mitleware before
* @return {Mitleware} Express Mitleware
*/
function expressRoles(rolesConfig, prevMw) {
  // return the express middleware
  return (req, res, next)=> {

    if(prevMw) {
      prevMw(req, res, next)
    }

    const method = req.method.toLowerCase()
    const valid$uid = req.params.uid ? req.params.uid === req.decoded.uid: false
    const route = req.route.path.toLowerCase()
    const myRol = req.decoded.rol.toLowerCase()
    const validRol = rolesConfig.filter(rol => rol.rol === myRol)
    const errMsg = `Access Denied - You don\'t have permission to: ${route} - ${method}`

    // No valid rol
    if(validRol.length < 1) {
      return res.status(401).json({
        message: errMsg
      })
    }

    const rolRoutes = validRol[0].routes

    for(let key in rolRoutes) {
      // has route?
      if(key === route) {
        const rootAccessList = getcleanAccess(rolRoutes[key])
        isAllowMethod(rootAccessList, method, valid$uid)
          .then(()=> {
            next()
          })
          .catch((err)=> {
            return res.status(401).json({
              message: errMsg
            })
          })
      }
    }
  }
}


module.exports = expressRoles
