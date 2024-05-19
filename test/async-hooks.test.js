'use strict'

const { test } = require('node:test')
const { createHook } = require('node:async_hooks')
const Fastify = require('fastify')
const tspl = require('@matteo.collina/tspl')
const fastifyAsyncForge = require('../')
const { app, request, reply, logger } = fastifyAsyncForge

// Adding an async_hooks hook to make sure we catch the issue
const hook = createHook({ init () {} })
hook.enable()

test('async_hooks lose context', async (t) => {
  const p = tspl(t, { plan: 8 })
  const fastify = Fastify()
  t.after(() => fastify.close())

  async function wrap () {
    // This is necessary to make it throw
    await 1
    await fastifyAsyncForge.start(fastify)
  }

  await wrap()

  // This is expected to throw due to https://github.com/nodejs/node/issues/53037
  p.throws(logger)
  p.throws(app)

  fastify.get('/', async function (_request, _reply) {
    p.strictEqual(app(), this)
    p.strictEqual(request(), _request)
    p.strictEqual(reply(), _reply)
    p.strictEqual(logger(), _request.log)
    return { hello: 'world' }
  })

  await fastify.listen({ port: 0 })

  // We use fetch() here to make sure we are breaking the async context
  const res = await fetch(fastify.listeningOrigin)
  p.strictEqual(res.status, 200)
  p.deepStrictEqual(await res.json(), {
    hello: 'world'
  })
})

test('enterWith fixes it', async (t) => {
  const p = tspl(t, { plan: 8 })
  const fastify = Fastify()
  t.after(() => fastify.close())

  async function wrap () {
    await 1
    await fastifyAsyncForge.start(fastify)
  }

  await wrap()
  await fastify.enterWith()

  p.strictEqual(logger(), fastify.log)
  p.strictEqual(app(), fastify)

  fastify.get('/', async function (_request, _reply) {
    p.strictEqual(app(), this)
    p.strictEqual(request(), _request)
    p.strictEqual(reply(), _reply)
    p.strictEqual(logger(), _request.log)
    return { hello: 'world' }
  })

  await fastify.listen({ port: 0 })

  // We use fetch() here to make sure we are breaking the async context
  const res = await fetch(fastify.listeningOrigin)
  p.strictEqual(res.status, 200)
  p.deepStrictEqual(await res.json(), {
    hello: 'world'
  })
})
