const Promise = require('bluebird')
const getCleanActions = require('./util/getCleanActions')

function checkRoute (validRol, req) {
  return new Promise((done, reject)=> {
    const validRoutes = validRol.routes
    const reqRoute = req.route.path.toLowerCase()
    // Iterate in valid routes
    for(route in validRoutes) {
      if(route === reqRoute) {
        // pass the valid actions for this route as an Array
        return done(getCleanActions(validRoutes[route]))
      }
    }
    // End iterate and no have access
    reject(`You do not have access to this route ${reqRoute}`)
  })
}

module.exports = checkRoute
