'use strict'

const { test } = require('node:test')
const Fastify = require('fastify')
const tspl = require('@matteo.collina/tspl')
const fastifyAsyncForge = require('../')

const { app, request, reply, logger } = fastifyAsyncForge

test('basic helpers', async (t) => {
  const p = tspl(t, { plan: 7 })
  const fastify = Fastify()

  await fastify.register(fastifyAsyncForge)

  fastify.runInAsyncScope(() => {
    p.strictEqual(logger(), fastify.log)
    p.strictEqual(app(), fastify)
  })

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

  await p.completed
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

  await p.completed
})

test('with additional onRequest hook', async (t) => {
  const p = tspl(t, { plan: 15 })
  const fastify = Fastify()

  await fastify.register(fastifyAsyncForge)

  fastify.runInAsyncScope(() => {
    p.strictEqual(logger(), fastify.log)
    p.strictEqual(app(), fastify)
  })

  fastify.addHook('onRequest', async function b (_request, _reply) {
    p.strictEqual(app(), this)
    p.strictEqual(request(), _request)
    p.strictEqual(reply(), _reply)
    p.strictEqual(logger(), _request.log)
  })

  fastify.get('/', {
    onRequest: async function a (_request, _reply) {
      p.strictEqual(app(), this)
      p.strictEqual(request(), _request)
      p.strictEqual(reply(), _reply)
      p.strictEqual(logger(), _request.log)
    }
  }, async function (_request, _reply) {
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

  await p.completed
})

test('onRequest hook added before registration fails', async (t) => {
  const p = tspl(t, { plan: 15 })
  const fastify = Fastify()

  fastify.addHook('onRequest', async function b (_request, _reply) {
    p.throws(app)
    p.throws(logger)
    p.throws(request)
    p.throws(reply)
  })

  await fastify.register(fastifyAsyncForge)

  fastify.runInAsyncScope(() => {
    p.strictEqual(logger(), fastify.log)
    p.strictEqual(app(), fastify)
  })

  fastify.get('/', {
    onRequest: async function a (_request, _reply) {
      p.strictEqual(app(), this)
      p.strictEqual(request(), _request)
      p.strictEqual(reply(), _reply)
      p.strictEqual(logger(), _request.log)
    }
  }, async function (_request, _reply) {
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

  await p.completed
})
