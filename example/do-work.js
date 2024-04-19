'use strict'

const { logger, app, request, reply } = require('../')

module.exports = function doWork () {
  const log = logger()
  log.info({
    foo: app().foo,
    a: request().a,
    b: reply().b
  }, 'doing work')
}
