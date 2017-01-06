'use strict'

const check_rol = require('./check-rol')
const check_route = require('./check-route')
const check_method = require('./check-method')



function logic(config, req, res, next) {
  const req_route = req.route.path.toLowerCase()
  const req_method = req.method.toLowerCase()
  const have_public_routes = config.filter(rol => rol.rol === 'public')

  // Have public routes in config and method is get?
  if(have_public_routes.length > 0) {

      let routes = have_public_routes[0].routes
        // Check the public routes are an Array
      if(Array.isArray(routes)) {

        routes.every((valid_route, i, a) => {
          if(valid_route === req_route) {
            // route valid in public
            if(req_method === 'get') {
              return next()
            } else {
              res.status(401).json({
                message: `You have not access ${req_route} ${req_method}`
              })
            }
          } else if(i === a.length-1) {
            // verify middle
            
            _middle(config, req, res, next)
          } else {
            return true
          }
        })

      } else {
        throw 'You need pass an Array in routes of public rol'
      }
  } else {
    // verify middle
    _middle(config, req, res, next)
  }
  
}


function _middle(config, req, res, next) {
  const errMsg = `Access Denied
  You don't have permission to: ${req.route.path} - ${req.method}`

  check_rol(config, req)
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
