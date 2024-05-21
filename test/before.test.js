'use strict'

const { describe, it, before } = require('node:test')
const assert = require('node:assert')
const Fastify = require('fastify')
const asyncforge = require('../')

describe('support exiting from a context', () => {
  let fastify
  before(async () => {
    fastify = Fastify()
    await fastify.register(asyncforge)
  })

  it('throws', () => {
    assert.throws(asyncforge.app)
  })

  it('does not throw using enterWith', () => {
    fastify.enterWith()
    assert.equal(asyncforge.app(), fastify)
  })
})

describe('enterWith in before', () => {
  let fastify
  before(async () => {
    fastify = Fastify()
    await fastify.register(asyncforge)
    fastify.enterWith()
  })

  it('throws', () => {
    assert.throws(asyncforge.app)
  })

  it('does not throw using enterWith again', () => {
    fastify.enterWith()
    assert.equal(asyncforge.app(), fastify)
  })
})
