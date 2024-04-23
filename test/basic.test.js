'use strict'

const { test } = require('node:test')
const Fastify = require('fastify')
const tspl = require('@matteo.collina/tspl')
const fastifyAsyncForge = require('../')

const { app, request, reply, logger } = fastifyAsyncForge

test('basic helpers with start', async (t) => {
  const p = tspl(t, { plan: 7 })
  const fastify = Fastify()

  await fastifyAsyncForge.start(fastify)

  p.strictEqual(logger(), fastify.log)
  p.strictEqual(app(), fastify)

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

test('basic helpers without start', async (t) => {
  const p = tspl(t, { plan: 7 })
  const fastify = Fastify()

  await fastify.register(fastifyAsyncForge)

  p.throws(logger)
  p.throws(app)

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

test('fastify.enterWith', async (t) => {
  const p = tspl(t, { plan: 7 })
  const fastify = Fastify()

  await fastify.register(fastifyAsyncForge)

  fastify.enterWith()

  p.strictEqual(logger(), fastify.log)
  p.strictEqual(app(), fastify)

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
