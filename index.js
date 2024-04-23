'use strict'

const fp = require('fastify-plugin')
const { memo, setAll } = require('asyncforge')

const app = memo('fastify.app')
const request = memo('fastify.request')
const reply = memo('fastify.reply')
const logger = memo('fastify.logger')

const fastifyAsyncForge = fp(function (fastify, opts, next) {
  fastify.decorate('enterWith', function () {
    try {
      app()
    } catch {
      setAll({
        [app.key]: this,
        [logger.key]: this.log
      })
    }
  })

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
