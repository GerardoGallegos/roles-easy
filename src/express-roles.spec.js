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
        "user": "get",
        "user": ".write .read",
    }
  }
]

function getReqMock(method, route, rol) {
  return {
      method,
      route: { path: route },
      decoded: { rol }
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


})
