'use strict'

const Promise = require('bluebird')
const getCleanActions = require('./util/get-clean-actions')

function checkRoute (validRol, req) {
  return new Promise((done, reject)=> {
    const routes = validRol.routes
    const req_route = req.route.path.toLowerCase()

    // validate is object no Array
    if(!Array.isArray(routes) && typeof routes === 'object' ) {
      // Iterate in valid routes
      for(let route in routes) {
        if(route.toLowerCase() === req_route) {
          // pass the valid actions for this route as an Array
          return done(getCleanActions(routes[route]))
        }
      }
      reject(`You do not have access to this route ${req_route}`)  
    } else {
      throw `You need pass an Object such as { '/route' : 'allowAction' }  in routes of rol`
    }

  })
}

module.exports = checkRoute
