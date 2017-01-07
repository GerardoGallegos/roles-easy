# roles-easy
Express middleware for simple access with multiple roles, "simple and beautiful"

## Installation

```bash
npm install -save roles-easy
```
## Usage

To can use this middleware you should have an authentication system 
such as [JWT](https://jwt.io) and save the token decode in req.decode, 
(note in public routes that obviously is not necessary), if you wanna know 
how implement [JWT](https://jwt.io) in [express.js](http://expressjs.com/) 
this tutorial can be useful [Tutorial JWT](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)


Once you have configured your JWT authentication system, you must define your roles inside an Array of Objects, 
every object represents a role and have the next shape `{ rol: 'rolName', routes: { } }`

* `rol` ( String ) Role name
* `routes` ( Object ) 'key' is the route, 'value' is an string of the valid actions

### Example

```javascript

var roles = [
  {
    rol: 'admin',
    routes: {
      '/dashboard': 'get post put delete',
      '/users': 'get',
      '/blog': 'post',
    }
  }
]

```

### More roles

In the following example we have 2 roles, `'admin' - 'member'` each with their own routes and the actions that are allowed in each one.

Note that in admin we use methods such as ( GET POST PUT DELETE ), but we can also do it faster by typing
`.read` or `.write` Note the beginning point as it is necessary.

`.read` - Can only make GET requests

`.write` - Can only make POST PUT DELETE requests

```javascript

var roles = [
  {
    rol: 'admin',
    routes: {
      '/dashboard': 'GET POST PUT DELETE',
      '/users': 'GET',
      '/blog': 'POST',
    }
  },
  {
    rol: 'member',
    routes: {
      '/galery': '.read',
      '/profile': '.read .write'
    }
  }
]

```

We can also define public routes that do not need any authentication, to do them we define a role as `'public'` and the routes must be an `array instead of an object` as for other roles, this allows you to define routes faster

```javascript
// * * * Note the routes in public is an Array and member's routes is an Object

var roles = [
  {
    rol: 'public',
    routes: [
      '/home',
      '/blog',
      '/contact',
    ]
  },
  {
    rol: 'member',
    routes: {
      '/galery': '.read',
      '/profile': '.read .write'
    }
  }
]

```

## Finishing the configuration

```javascript

var rolesEasy = require('./roles-easy')

// We defined the roles, routes and the valid actions

var roles = [
  {
    rol: 'public',
    routes: [
      '/home',
      '/blog',
      '/contact',
    ]
  },
  {
    rol: 'member',
    routes: {
      '/galery': '.read',
      '/profile': '.read .write'
    }
  }
]

// Using Express
var express = require('express')
var app = express()

var checkToken = require('./auth.checkToken')

// The Middleware is created when you pass the roles
var checkRoles = rolesEasy(roles) 


// This would be an public route
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// * * *  This would be a protected route
// Use the Middleware in your API Before you should check
// the token and if is valid save the decode in req.decode
// This is done through of checkToken Middleware

api.get('/dashboard/:id', checkToken, checkRoles, ()=>{
  res.status(200).json({
    message: 'Awesome'
  })
})

```


