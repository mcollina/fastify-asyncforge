'use strict'

const fp = require('fastify-plugin')
const { memo, setAll } = require('asyncforge')

const app = memo()
const request = memo()
const reply = memo()
const logger = memo()

const fastifyAsyncForge = fp(function (fastify, opts, next) {
  fastify.addHook('onRequest', async function (req, res) {
    setAll({
      [app.key]: this,
      [request.key]: req,
      [reply.key]: res,
      [logger.key]: req.log
    })
  })
  next()
})

function start (fastify) {
  setAll({
    [app.key]: fastify,
    [logger.key]: fastify.log
  })

  return fastify.register(fastifyAsyncForge)
}

module.exports = fastifyAsyncForge
module.exports.start = start
module.exports.app = app
module.exports.request = request
module.exports.reply = reply
module.exports.logger = logger
