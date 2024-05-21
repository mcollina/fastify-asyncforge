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

## `.enterWith()`

In case `.runInAsyncScope()` is incovenient, you can use `.enterWith()`

```js
import fastify from 'fastify'
import asyncforge from 'fastify-asyncforge'

const fastify = Fastify()

// Calling .enterWith() is necessary or `asyncforge.app()` will throw
fastify.enterWith()
asyncforge.app()
```

### Notice

Note that you cannot wrap `.enterWith()` inside an async function, as it will not work.
If you are interested in knowing more, read https://github.com/nodejs/node/issues/53037.

## License

MIT
