import { before, describe, it } from 'node:test'
import Fastify from 'fastify'
import { app, start } from '../index.js'
import assert from 'node:assert/strict'

let fastify

async function build (config) {
  const server = await Fastify()

  server.decorate('config', config)
  await start(server)

  return server
}

describe('support exiting from a context', () => {
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
