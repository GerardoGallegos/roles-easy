const getcleanAccess = require('./util/getcleanAccess')
const isAllowMethod = require('./util/isAllowMethod')

function expressRoles(rolesConfig) {
  // return the express middleware
  return (req, res, next)=> {
    const method = req.method.toLowerCase()
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
        isAllowMethod(rootAccessList, method)
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
