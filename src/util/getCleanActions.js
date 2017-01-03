
function getCleanActions(actionsStiring) {
  const pattern = new RegExp(/(get|post|put|delete|\.read|.write|\$\w+)/gi)
  return actionsStiring
		.match(pattern)
		.map(action => action.toLowerCase())
}

module.exports = getCleanActions
