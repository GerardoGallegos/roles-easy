const expect = require('chai').expect

const expressR = require('./express-roles')
const config = [
  {
    rol: 'admin',
    routes: {
      "/readandwrite": ".read .write",
      "/onlyread": ".read",
      "/onlywrite": ".write",
      "/onlypost": "post"
    }
  },
  {
    rol: 'member',
    routes: {
        "/profile/:uid": "$uid .read .write",
        "user": ".write .read",
    }
  }
]

function getReqMock(method, route, rol, decodedUid, paramsUid) {
  return {
      method,
      route: { path: route },
      decoded: {
        rol: rol,
        uid: decodedUid
      },
      params: {
        uid: paramsUid
      }
  }
}

const expressRoles = expressR(config)

describe('express-roles', ()=> {

  it('validate a function', ()=> {
      expect(expressRoles).to.be.a('function')
  })

  it('Permit access /readandwrite [POST]', ()=> {
    const req = getReqMock('post', '/readandwrite', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('Permit only .read [GET]', ()=> {
    const req = getReqMock('get', '/onlyread', 'admin')
    const next = () => {
      expect(true).to.be.true
    }
    expressRoles(req, {}, next)
  })

  it('No permit [POST]', ()=> {
      const req = getReqMock('post', '/onlyread', 'admin')
      const next = () => { }
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

  it('No permit [PUT]', ()=> {
      const req = getReqMock('put', '/onlyread', 'admin')
      const next = () => { }
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

  it('No permit [DELETE]', ()=> {
      const req = getReqMock('delete', '/onlyread', 'admin')
      const next = () => { }
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

  describe('Permit access /onlywrite [POST PUT DELETE]', ()=> {

    it('Permit access { /onlywrite } [POST]', ()=> {
        const req = getReqMock('post', '/onlywrite', 'admin')
        const next = () => {
          expect(true).to.be.true
        }
        expressRoles(req, {}, next)
    })

    it('Permit access { /onlywrite } [PUT]', ()=> {
        const req = getReqMock('put', '/onlywrite', 'admin')
        const next = () => {
          expect(true).to.be.true
        }
        expressRoles(req, {}, next)
    })

    it('Permit access { /onlywrite } [DELETE]', ()=> {
        const req = getReqMock('delete', '/onlywrite', 'admin')
        const next = () => {
          expect(true).to.be.true
        }
        expressRoles(req, {}, next)
    })

    it('No permit access { /onlywrite } [GET]', ()=> {
        const req = getReqMock('get', '/onlywrite', 'admin')
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

  })

  describe('Permit access { /onlypost } [POST]', ()=> {
    it('Permit [POST]', ()=> {
      const req = getReqMock('delete', '/onlywrite', 'admin')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('No Permit [GET]', ()=> {
      const req = getReqMock('get', '/onlypost', 'admin')
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

    it('No Permit [PUT]', ()=> {
      const req = getReqMock('put', '/onlypost', 'admin')
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

    it('No Permit [DELETE]', ()=> {
      const req = getReqMock('delete', '/onlypost', 'admin')
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
  })



  describe('Testing prev Mitleware', ()=> {
    it('Has middleware (permit)', ()=> {
      const req = getReqMock('post', '/onlypost', 'admin')
      const next = () => {}
      const prevMiddleware = (req, res, next)=> {
        expect(req).to.be.ok
        expect(res).to.be.ok
        expect(next).to.be.ok
        next()
      }
      const expressRolesWidthPrev = expressR(config, prevMiddleware)

      expressRolesWidthPrev(req, {}, next)
    })

    it('Has middleware (No permit)', ()=> {
      const req = getReqMock('put', '/onlypost', 'admin')
      const next = () => {}
      const prevMiddleware = (req, res, next)=> {
        expect(req).to.be.ok
        expect(res).to.be.ok
        expect(next).to.be.ok
        next()
      }
      const expressRolesWidthPrev = expressR(config, prevMiddleware)

      expressRolesWidthPrev(req, {
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


  describe('Testing $uid', ()=> {

    it('Has valid $uid { /profile/:uid } [POST] ', ()=> {
      const req = getReqMock('post', '/profile/:uid', 'member', '123456', '123456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

    it('Has NOT valid $uid { /profile/:uid } [POST] ', ()=> {
      const req = getReqMock('post', '/profile/:uid', 'member', '123456', '123457')
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

    it('Has valid $uid { /profile/:uid } [GET] ', ()=> {
      const req = getReqMock('get', '/profile/:uid', 'member', '123456', '123456')
      const next = () => {
        expect(true).to.be.true
      }
      expressRoles(req, {}, next)
    })

  })

})
