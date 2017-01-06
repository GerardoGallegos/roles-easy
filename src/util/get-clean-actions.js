'use strict'

function getCleanMethods(actionsStiring) {
  const pattern = new RegExp(/(get|post|put|delete|\.read|.write|\$\w+)/gi)
  const populate = _getGroupActions(actionsStiring)
  return populate
  		.match(pattern)
		  .map(action => action.toLowerCase())
}

function _getGroupActions(actionsStiring) {
  return actionsStiring
    .replace(/\.write/gi, 'post put delete')
    .replace(/\.read/gi, 'get')
}

module.exports = getCleanMethods
