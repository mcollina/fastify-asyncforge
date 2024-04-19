'use strict'

const { test } = require('node:test')
const Fastify = require('fastify')
const tspl = require('@matteo.collina/tspl')
const fastifyAsyncForge = require('../')

const { app, request, reply, logger } = fastifyAsyncForge

test('basic helpers', async (t) => {
  const p = tspl(t, { plan: 6 })
  const fastify = Fastify()

  await fastify.register(fastifyAsyncForge)

  p.strictEqual(logger(), app.log)

  fastify.get('/', async function (_request, _reply) {
    p.strictEqual(app(), this)
    p.strictEqual(request(), _request)
    p.strictEqual(reply(), _reply)
    p.strictEqual(logger(), _request.log)
    return { hello: 'world' }
  })

  const res = await fastify.inject({
    method: 'GET',
    url: '/'
  })

  p.strictEqual(res.statusCode, 200)

  await p.complete
})
