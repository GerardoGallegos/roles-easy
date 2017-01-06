const expect = require('chai').expect

const expressR = require('./roles-easy')

const config = [
  {
    rol: 'public',
    routes: [
      '/home',
      '/blog',
      '/contact'
    ]
  },
  {
    rol: 'admin',
    routes: {
      "/readandwrite": ".read .write",
      "/onlyread": ".read",
      "/onlywrite": ".write",
      "/onlypost": "post",
      "/onlyput": "put",
      "/onlydelete": "delete",
      "/dashboard/:uid": "$uid .read .write",
      "/dashboardOnlyRead/:uid": "$uid .read",
      "/dashboardOnlyWrite/:uid": "$uid .write",
      "/dashboardOnlyGet/:uid": "$uid get",
      "/dashboardOnlyPost/:uid": "$uid post",
      "/dashboardOnlyDelete/:uid": "$uid delete",
      "/dashboardOnlyPostDelete/:uid": "$uid delete post"
    }
  },
  {
    rol: 'member',
    routes: {
        "/profile/:id": "$id .read .write",
        "/user": ".read",
    }
  }
]

function getReqMock(method, route, rol, $varName, $varValue) {
  return {
      method,
      route: { path: route },
      decoded: {
        rol: rol,
        [$varName]: $varValue
      },
      params: {
        [$varName]: $varValue
      }
  }
}

function getReqMockNo$var(method, route, rol, $varName, $varValue) {
  return {
      method,
      route: { path: route },
      decoded: {
        rol: rol
      },
      params: {
        [$varName]: $varValue
      }
  }
}

const expressRoles = expressR(config)


/**
 * PUBLIC ROUTES
 * 
 * [*] Access to public route only GET method
 * [*] Denied to not public route
 * [*] Denied to public route with request to invalid methods such as POST - PUT -DELETE
 * [*] Pass Object instead of Array in routes
 * 
 */

describe('TEST PUBLIC ROUTES', ()=> {

  it('Access to public route only GET method { /home } [GET]', ()=> {
    const req = getReqMock('get', '/home', 'anonymous')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('Access to public route only GET method { /blog } [GET]', ()=> {
    const req = getReqMock('get', '/blog', 'anou')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('Access to public route only GET method { /contact } [GET]', ()=> {
    const req = getReqMock('get', '/contact', 'nimus')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('Public Route invalid method { /home } [POST]', ()=> {
    const req = getReqMock('post', '/home', 'nimus')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Public Route invalid method { /home } [PUT]', ()=> {
    const req = getReqMock('put', '/home', 'nimus')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Public Route invalid method { /home } [DELETE]', ()=> {
    const req = getReqMock('delete', '/home', 'nimus')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Public Route invalid method { /blog } [POST]', ()=> {
    const req = getReqMock('post', '/blog', 'nimus')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Public Route invalid method { /blog } [PUT]', ()=> {
    const req = getReqMock('put', '/blog', 'nimus')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Public Route invalid method { /blog } [DELETE]', ()=> {
    const req = getReqMock('delete', '/blog', 'nimus')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Denied to not public route { /readandwrite } [GET]', ()=> {
    const req = getReqMock('get', '/readandwrite', 'nimus')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Denied to not public route { /readandwrite } [POST]', ()=> {
    const req = getReqMock('post', '/readandwrite', 'nimus')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Denied to not public route { /readandwrite } [PUT]', ()=> {
    const req = getReqMock('put', '/readandwrite', 'nimus')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Denied to not public route { /readandwrite } [DELETE]', ()=> {
    const req = getReqMock('delete', '/readandwrite', 'nimus')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Denied to not public route { /onlypost } [GET]', ()=> {
    const req = getReqMock('get', '/onlypost', 'nimus')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Denied to not public route { /onlypost } [POST]', ()=> {
    const req = getReqMock('post', '/onlypost', 'nimus')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Denied to not public route { /onlypost } [PUT]', ()=> {
    const req = getReqMock('put', '/onlypost', 'nimus')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Denied to not public route { /onlypost } [DELETE]', ()=> {
    const req = getReqMock('delete', '/onlypost', 'nimus')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Pass Object instead of Array in routes { /onlypost } [DELETE]', ()=> {

    const config = [{ rol: 'public', routes: {}}]

    const expressRolesInternal = expressR(config)

    const req = getReqMock('get', '/home', 'nimus')
    const req_route = req.route.path
    const req_method = req.method
    const errExpected = 'You need pass an Array in routes of public rol'
    const next = () => {}

    try{
      expressRolesInternal(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    } catch(err) {
      expect(err).to.equal(errExpected)
    }
    
  })
})





describe('TEST ADMIN ROUTES', ()=> {

  it('validate a function', ()=> {
      expect(expressRoles).to.be.a('function')
  })

  it('Permit access /readandwrite [GET]', ()=> {
    const req = getReqMock('get', '/readandwrite', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('Permit access /readandwrite [POST]', ()=> {
    const req = getReqMock('post', '/readandwrite', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('Permit access /readandwrite [PUT]', ()=> {
    const req = getReqMock('put', '/readandwrite', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('Permit access /readandwrite [DELETE]', ()=> {
    const req = getReqMock('DELETE', '/readandwrite', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('Permit access /onlyread [GET]', ()=> {
    const req = getReqMock('GET', '/readandwrite', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('NO Permit access to invalid methods /onlyread [POST]', ()=> {
    const req = getReqMock('POST', '/onlyread', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('NO Permit access to invalid methods /onlyread [PUT]', ()=> {
    const req = getReqMock('PUT', '/onlyread', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('NO Permit access to invalid methods /onlyread [DELETE]', ()=> {
    const req = getReqMock('DELETE', '/onlyread', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Permit access to /onlywrite [POST]', ()=> {
    const req = getReqMock('POST', '/onlywrite', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('Permit access to /onlywrite [PUT]', ()=> {
    const req = getReqMock('PUT', '/onlywrite', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('Permit access to /onlywrite [DELETE]', ()=> {
    const req = getReqMock('DELETE', '/onlywrite', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('NO Permit access to invalid method /onlywrite [GET]', ()=> {
    const req = getReqMock('GET', '/onlywrite', 'admin')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Permit access to /onlypost [POST]', ()=> {
    const req = getReqMock('POST', '/onlypost', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('NO Permit access to invalid method /onlypost [GET]', ()=> {
    const req = getReqMock('GET', '/onlypost', 'admin')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('NO Permit access to invalid method /onlypost [PUT]', ()=> {
    const req = getReqMock('PUT', '/onlypost', 'admin')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('NO Permit access to invalid method /onlypost [DELETE]', ()=> {
    const req = getReqMock('DELETE', '/onlypost', 'admin')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Permit access to /onlyput [PUT]', ()=> {
    const req = getReqMock('PUT', '/onlyput', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('NO Permit access to invalid method /onlyput [POST]', ()=> {
    const req = getReqMock('POST', '/onlyput', 'admin')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('NO Permit access to invalid method /onlyput [GET]', ()=> {
    const req = getReqMock('GET', '/onlyput', 'admin')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('NO Permit access to invalid method /onlyput [DELETE]', ()=> {
    const req = getReqMock('DELETE', '/onlyput', 'admin')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Permit access to /onlydelete [DELETE]', ()=> {
    const req = getReqMock('DELETE', '/onlydelete', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('NO Permit access to invalid method /onlydelete [GET]', ()=> {
    const req = getReqMock('GET', '/onlydelete', 'admin')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('NO Permit access to invalid method /onlydelete [POST]', ()=> {
    const req = getReqMock('POST', '/onlydelete', 'admin')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('NO Permit access to invalid method /onlydelete [PUT]', ()=> {
    const req = getReqMock('PUT', '/onlydelete', 'admin')
    const next = () => {}
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  describe('TESTING ACTIONS TYPE $VARIABLE', ()=> {

    it('Has invalid $variable { /dashboard/:id } [GET] ', ()=> {
      const req = getReqMockNo$var('GET', '/profile/:id', 'admin', 'id', '123456')
      const next = () => {}
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a valid $variable { /dashboard/:uid } [GET] ', ()=> {
      const req = getReqMock('get', '/dashboard/:uid', 'admin', 'uid', '123456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('Have a valid $variable { /dashboard/:uid } [POST] ', ()=> {
      const req = getReqMock('POST', '/dashboard/:uid', 'admin', 'uid', '123456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('Have a valid $variable { /dashboard/:uid } [PUT] ', ()=> {
      const req = getReqMock('PUT', '/dashboard/:uid', 'admin', 'uid', '123456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('Have a valid $variable { /dashboard/:uid } [DELETE] ', ()=> {
      const req = getReqMock('DELETE', '/dashboard/:uid', 'admin', 'uid', '123456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('Have a invalid $variable { /dashboard/:uid } [GET] ', ()=> {
      const req = getReqMock('get', '/dashboard/:uid', 'admin', 'id', '123456')
      const next = () => {}
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a invalid $variable { /dashboard/:uid } [GET] ', ()=> {
      const req = getReqMock('get', '/dashboard/:uid', 'admin', 'uids', '123456')
      const next = () => {}
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a valid $variable { /dashboardOnlyRead/:uid } [GET] ', ()=> {
      const req = getReqMock('get', '/dashboardOnlyRead/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyRead/:uid } [POST] ', ()=> {
      const req = getReqMock('post', '/dashboardOnlyRead/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyRead/:uid } [PUT] ', ()=> {
      const req = getReqMock('PUT', '/dashboardOnlyRead/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyRead/:uid } [DELETE] ', ()=> {
      const req = getReqMock('DELETE', '/dashboardOnlyRead/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })




    it('Have a valid $variable { /dashboardOnlyWrite/:uid } [POST] ', ()=> {
      const req = getReqMock('POST', '/dashboardOnlyWrite/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('Have a valid $variable { /dashboardOnlyWrite/:uid } [PUT] ', ()=> {
      const req = getReqMock('PUT', '/dashboardOnlyWrite/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('Have a valid $variable { /dashboardOnlyWrite/:uid } [DELETE] ', ()=> {
      const req = getReqMock('DELETE', '/dashboardOnlyWrite/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyWrite/:uid } [GET] ', ()=> {
      const req = getReqMock('GET', '/dashboardOnlyWrite/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })


    it('Have a valid $variable { /dashboardOnlyGet/:uid } [GET] ', ()=> {
      const req = getReqMock('GET', '/dashboardOnlyGet/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyGet/:uid } [POST] ', ()=> {
      const req = getReqMock('POST', '/dashboardOnlyGet/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyGet/:uid } [PUT] ', ()=> {
      const req = getReqMock('PUT', '/dashboardOnlyGet/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyGet/:uid } [DELETE] ', ()=> {
      const req = getReqMock('DELETE', '/dashboardOnlyGet/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    // ONLY POST

    it('Have a valid $variable { /dashboardOnlyPost/:uid } [POST] ', ()=> {
      const req = getReqMock('POST', '/dashboardOnlyPost/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyPost/:uid } [GET] ', ()=> {
      const req = getReqMock('GET', '/dashboardOnlyPost/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyPost/:uid } [PUT] ', ()=> {
      const req = getReqMock('PUT', '/dashboardOnlyPost/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyPost/:uid } [DELETE] ', ()=> {
      const req = getReqMock('DELETE', '/dashboardOnlyPost/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a invalid $variable for valid method { /dashboardOnlyPost/:uid } [POST] ', ()=> {
      const req = getReqMock('POST', '/dashboardOnlyPost/:uid', 'admin', 'id', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })



    it('Have a valid $variable { /dashboardOnlyDelete/:uid } [DELETE] ', ()=> {
      const req = getReqMock('DELETE', '/dashboardOnlyDelete/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('Have a invalid $variable { /dashboardOnlyDelete/:uid } [DELETE] ', ()=> {
      const req = getReqMock('DELETE', '/dashboardOnlyDelete/:uid', 'admin', 'euid', '1232456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyDelete/:uid } [GET] ', ()=> {
      const req = getReqMock('GET', '/dashboardOnlyDelete/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyDelete/:uid } [POST] ', ()=> {
      const req = getReqMock('POST', '/dashboardOnlyDelete/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyDelete/:uid } [PUT] ', ()=> {
      const req = getReqMock('PUT', '/dashboardOnlyDelete/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })



    it('Have a invalid $variable { /dashboardOnlyPostDelete/:uid } [POST] ', ()=> {
      const req = getReqMock('POST', '/dashboardOnlyPostDelete/:uid', 'admin', 'euid', '1232456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a invalid $variable { /dashboardOnlyPostDelete/:uid } [DELETE] ', ()=> {
      const req = getReqMock('DELETE', '/dashboardOnlyPostDelete/:uid', 'admin', '_id', '1232456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a valid $variable { /dashboardOnlyPostDelete/:uid } [POST] ', ()=> {
      const req = getReqMock('POST', '/dashboardOnlyPostDelete/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('Have a valid $variable { /dashboardOnlyPostDelete/:uid } [DELETE] ', ()=> {
      const req = getReqMock('DELETE', '/dashboardOnlyPostDelete/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyPostDelete/:uid } [GET] ', ()=> {
      const req = getReqMock('GET', '/dashboardOnlyPostDelete/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })

    it('Have a valid $variable for invalid method { /dashboardOnlyPostDelete/:uid } [PUT] ', ()=> {
      const req = getReqMock('PUT', '/dashboardOnlyPostDelete/:uid', 'admin', 'uid', '1232456')
      const next = () => {
        expect(true).to.be.false
      }
      expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
    })
  })
})


describe('TEST MEMBER ROL', ()=> {

  it('Permin access { /profile/:id } [GET] ', ()=> {
    const req = getReqMock('GET', '/profile/:id', 'member', 'id', '1232456')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('Permin access { /profile/:id } [POST] ', ()=> {
    const req = getReqMock('POST', '/profile/:id', 'member', 'id', '1232456')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('Permin access { /profile/:id } [PUT] ', ()=> {
    const req = getReqMock('PUT', '/profile/:id', 'member', 'id', '1232456')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('Permin access { /profile/:id } [DELETE] ', ()=> {
    const req = getReqMock('DELETE', '/profile/:id', 'member', 'id', '1232456')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('NO Permin access invalid $variable { /profile/:id } [GET] ', ()=> {
    const req = getReqMock('GET', '/profile/:id', 'member', 'uid', '1232456')
    const next = () => {
      expect(true).to.be.false
    }
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('NO Permin access valid $variable{ /profile/:id } [POST] ', ()=> {
    const req = getReqMock('POST', '/profile/:id', 'member', 'uid', '1232456')
    const next = () => {
      expect(true).to.be.false
    }
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('NO Permin access valid $variable{ /profile/:id } [PUT] ', ()=> {
    const req = getReqMock('PUT', '/profile/:id', 'member', 'uid', '1232456')
    const next = () => {
      expect(true).to.be.false
    }
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })


  it('NO Permin access valid $variable{ /profile/:id } [DELETE] ', ()=> {
    const req = getReqMock('DELETE', '/profile/:id', 'member', 'uid', '1232456')
    const next = () => {
      expect(true).to.be.false
    }
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('Permin access { /user } [GET] ', ()=> {
    const req = getReqMock('GET', '/user', 'member', 'id', '1232456')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('No Permin access invalid method { /user } [POST] ', ()=> {
    const req = getReqMock('POST', '/user', 'member', 'id', '1232456')
    const next = () => {
      expect(true).to.be.false
    }
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('No Permin access invalid method { /user } [PUT] ', ()=> {
    const req = getReqMock('PUT', '/user', 'member', 'id', '1232456')
    const next = () => {
      expect(true).to.be.false
    }
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('No Permin access invalid method { /user } [DELETE] ', ()=> {
    const req = getReqMock('DELETE', '/user', 'member', 'id', '1232456')
    const next = () => {
      expect(true).to.be.false
    }
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

  it('No Permin access invalid route or dont\'have access { /user } [DELETE] ', ()=> {
    const req = getReqMock('DELETE', '/user123', 'member', 'id', '1232456')
    const next = () => {
      expect(true).to.be.false
    }
    expressRoles(req, {
        status: code => {
          expect(code).to.equal(401)
          return {
            json: r => {
              expect(r).to.be.a('object')
            }
          }
        }
      }, next)
  })

})