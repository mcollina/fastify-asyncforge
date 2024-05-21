# fastify-asyncforge

Provide easy [AsyncLocalStorage](https://nodejs.org/api/async_context.html) magic to your
[Fastify](https://fastify.dev) apps. It's based on [asyncforge](http://npm.im/asyncforge).

## Install

```sh
npm i fastify fastify-asyncforge
```

## Usage

```js
// app.mjs
import fastify from 'fastify'
import doWork from './do-work.mjs'
import asyncforge, { logger } from 'fastify-asyncforge'

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

// do-work.mjs
import { logger, app, request, reply } from 'fastify-asyncforge'

export default function doWork () {
  const log = logger()
  log.info({
    foo: app().foo,
    a: request().a,
    b: reply().b
  }, 'doing work')
}
```

## License

MIT
