'use strict'

const fp = require('fastify-plugin')
const { memo, setAll } = require('asyncforge')

const app = memo()
const request = memo()
const reply = memo()
const logger = memo()

module.exports = fp(async function (fastify, opts) {
  app.set(fastify)
  logger.set(fastify.log)

  fastify.addHook('onRequest', async function (req, res) {
    setAll({
      [app.key]: this,
      [request.key]: req,
      [reply.key]: res,
      [logger.key]: req.log
    })
  })
})

module.exports.app = app
module.exports.request = request
module.exports.reply = reply
module.exports.logger = logger
