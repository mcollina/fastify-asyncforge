# fastify-asyncforge

## Install

```sh
npm i fastify fastify-asyncforge
```

## Usage

```js
// App.js
import fastify from 'fastify'
import { start } from 'fastify-asyncforge'
import doWork from './do-work.mjs'

const app = fastify({
  logger: true
})

await start(app)

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
