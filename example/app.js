'use strict'

const fastify = require('fastify')
const doWork = require('./do-work')
const { logger, start } = require('../index')

const app = fastify({
  logger: true
})
app.register(require('../index'))

start(app)

logger().info('hello')

app.decorate('foo', 'bar')
app.decorateRequest('a')
app.decorateReply('b')

app.addHook('onRequest', async function (req, reply) {
  req.a = 'a'
  reply.b = 'b'
})

app.get('/', async function (request, reply) {
  doWork()
  return { hello: 'world' }
})

app.listen({ port: 3000 })
