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


## License

MIT
