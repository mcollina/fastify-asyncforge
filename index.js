'use strict'

const fp = require('fastify-plugin')
const { memo, create } = require('asyncforge')

const app = memo('fastify.app')
const request = memo('fastify.request')
const reply = memo('fastify.reply')
const logger = memo('fastify.logger')

const fastifyAsyncForge = fp(function (fastify, opts, next) {
  const store = create()

  fastify.decorate('runInAsyncScope', function (fn) {
    return store.run(fn)
  })

  fastify.addHook('onRequest', function (req, res, next) {
    const store = create()

    // We use callbacks because we cannot propagate through async/await
    store.run(() => {
      app.set(this)
      request.set(req)
      reply.set(res)
      logger.set(req.log)
      next()
    })
  })

  store.run(() => {
    app.set(fastify)
    logger.set(fastify.log)
    next()
  })
})

module.exports = fastifyAsyncForge
module.exports.app = app
module.exports.request = request
module.exports.reply = reply
module.exports.logger = logger
