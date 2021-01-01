'use strict'
const fs = require('fs')
const os = require('os')
const traverse = require('traverse')
const service_map = new Map([
  ['batch', 'batch'],
  ['ddb', 'ddb']
])
module.exports = (pluginContext) => {
  return (query, env) => {
    if (query.length === 0) return Promise.resolve([])
    const variables = env || {}
    const configFile = variables['file']
    const args = query.split(' ', 2)
    var account = null, service = null
    if (args.length == 1) {
      service = args[0]
    } else {
      account = args[0]
      service = args[1]
    }
    
    return new Promise((resolve, reject) => {
      var url = 'https://us-west-2.console.aws.amazon.com/${service}/home?region=us-west-2#'
      if (account) {
        var account_name = variables[account]
        var orig = encodeURI(url)
        url = 'https://access.amazon.com/aws/accounts/fetchConsoleUrl?account_name=${account_name}&destination=${orig}'
      }
      resolve(url)
    })
  }
}
