# fastify-asyncforge

Provide easy [AsyncLocalStorage](https://nodejs.org/api/async_context.html) magic to your
[Fastify](https://fastify.dev) apps. It's based on [asyncforge](http://npm.im/asyncforge).

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

// It's fundamental that `start` is called before any other plugins are registered, otherwise the helpers
// would not work as expected
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

### enterWith

If you need to alter the current asynchronous context, you can use the `enterWith` helper.

```js
import { before, describe, it } from "node:test";
import Fastify from "fastify";
import asyncforge, { app, start } from "fastify-asyncforge";
import assert from "node:assert/strict";

let fastify;

async function build(config) {
  const server = await Fastify();

  server.register(asyncforge)
  server.decorate("config", config);
  console.log("config from memo", app().config);

  return server;
}

describe("support exiting from a context", () => {
  before(async () => {
    fastify = await build({ foo: "bar" });
  });

  it("throws", () => {
    assert.throws(app);
  });

  it("does not throw using enterWith", () => {
    fastify.enterWith();
    assert.equal(app(), fastify);
  });
});
```

## Usage together with other async_hooks tools (e.g. DataDog, OpenTelemetry, etc)

If you are using `fastify-asyncforge` together with another `async_hooks` based tool,
you __must__ call `start` without adding an intermediate async function.
Alternatively, you'd need to use `.enterWith()`

```js
import fastify from 'fastify'
import asyncforge from 'fastify-asyncforge'

const fastify = Fastify()

async function wrap () {
  // This is necessary to make it throw
  await 1
  await asyncforge.start(fastify)
}

await wrap()

// Calling .enterWith() is necessary or `asyncforge.app()` will throw
fastify.enterWith()
asyncforge.app()
```

If you are interested in knowing more, read https://github.com/nodejs/node/issues/53037.

## License

MIT
