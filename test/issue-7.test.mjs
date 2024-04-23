import { before, describe, it } from 'node:test'
import Fastify from 'fastify'
import asyncforge, { app, start } from '../index.js'
import assert from 'node:assert/strict'

let fastify

async function build (config) {
  const server = await Fastify()

  server.decorate('config', config)
  await start(server)

  return server
}

async function buildWithRegister (config) {
  const server = await Fastify()

  server.register(asyncforge)
  server.decorate('config', config)

  return server
}

describe('support exiting from a context / start', () => {
  before(async () => {
    fastify = await build({ foo: 'bar' })
  })

  it('throws', () => {
    assert.throws(app)
  })

  it('does not throw using enterWith', () => {
    fastify.enterWith()
    assert.equal(app(), fastify)
  })
})

describe('support exiting from a context / register', () => {
  before(async () => {
    fastify = await buildWithRegister({ foo: 'bar' })
  })

  it('throws', () => {
    assert.throws(app)
  })

  it('does not throw using enterWith', () => {
    fastify.enterWith()
    assert.equal(app(), fastify)
  })
})
