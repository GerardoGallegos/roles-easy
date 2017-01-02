 function getcleanAccess(access) {
  const accessPattern = new RegExp(/(\.write|\.read|get|post|put|delete)/gi)
  let accessCleaned = access
  if(typeof access === 'string') {
    // string such as '.write .read'
    accessCleaned = access.match(accessPattern)
  }
  return accessCleaned.map(ac => ac.toLocaleLowerCase())
}

module.exports = getcleanAccess
