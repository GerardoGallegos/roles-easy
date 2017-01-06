const check_rol = require('./check-rol')
const check_route = require('./check-route')
const check_method = require('./check-method')



function logic(rolesConfig, req, res, next) {
  const req_route = req.route.path.toLowerCase()
  const req_method = req.method.toLowerCase()

  rolesConfig.forEach((validRol, index) => {
    if(validRol.rol === 'public') {

      validRol.routes.forEach((publicRoute, i) => {
        console.log(req_route);
        if(publicRoute === req_route) {
          if(req_method === 'get') {
            // valid public route
            next()
          } else {
            res.status(401).json({})
          }
        }
      })
    } else {
      _middle(rolesConfig, req, res, next)
    }
  })

  // _middle(rolesConfig, req, res, next)

}


function isPublic() {
  return new Promise((done, reject)=> {

  })
}

function _middle(roles, req, res, next) {
  const errMsg = `Access Denied
  You don't have permission to: ${req.route.path} - ${req.method}`

  check_rol(roles, req)
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


module.exports = logic
