import fastify from 'fastify'
import doWork from './do-work.mjs'
import asyncforge, { logger } from '../index.js'

const app = fastify({
  logger: true
})
await app.register(asyncforge)

app.runInAsyncScope(() => {
  logger().info('hello')
})

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
