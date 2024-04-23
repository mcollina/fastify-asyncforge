import { expectAssignable, expectError, expectType } from "tsd";
import fastifyasyncforge, { app, logger, reply, request, start } from ".";
import fastify, {
  type FastifyInstance,
  type FastifyBaseLogger,
  type FastifyRequest,
  type FastifyReply,
  type RawServerDefault,
  type RouteGenericInterface,
  type FastifyPluginCallback,
} from "fastify";

const fastifyInstance = fastify();
expectAssignable<FastifyInstance>(fastifyInstance.register(fastifyasyncforge));
expectAssignable<FastifyPluginCallback>(fastifyasyncforge);

// app
const forgeApp = app();
expectAssignable<FastifyInstance | undefined>(app());
expectAssignable<FastifyInstance>(fastifyInstance);
expectAssignable<FastifyInstance | undefined>(
  app<FastifyInstance<RawServerDefault>>()
);
expectError<FastifyInstance | undefined>(app<string>());
expectError<FastifyInstance | undefined>({});
if (forgeApp) {
  expectAssignable<FastifyInstance>(forgeApp);
  expectAssignable<string>(forgeApp.version);
  expectAssignable<string>(forgeApp.prefix);
}

// request
const forgeRequest = request();
expectType<FastifyRequest | undefined>(forgeRequest);
expectType<FastifyRequest | undefined>(
  request<FastifyRequest<RouteGenericInterface>>()
);
expectError<FastifyRequest | undefined>({});
expectError<FastifyRequest | undefined>(request<boolean>());
if (forgeRequest) {
  expectType<FastifyRequest>(forgeRequest);
  expectType<unknown>(forgeRequest.body);
  expectType<boolean>(forgeRequest.is404);
}

// reply
const forgeReply = reply();
expectType<FastifyReply | undefined>(forgeReply);
expectType<FastifyReply | undefined>(reply<FastifyReply<RawServerDefault>>());
expectError<FastifyReply | undefined>(reply<number>());
expectError<FastifyReply | undefined>({});
if (forgeReply) {
  expectType<FastifyReply>(forgeReply);
  expectType<number>(forgeReply.statusCode);
  expectType<boolean>(forgeReply.sent);
}

// logger
const forgeLogger = logger();
expectAssignable<FastifyBaseLogger | undefined>(fastifyInstance.log);
expectType<FastifyBaseLogger | undefined>(logger());
expectType<FastifyBaseLogger | undefined>(logger<FastifyBaseLogger>());
expectError<FastifyBaseLogger | undefined>(logger<object>());
expectError<FastifyBaseLogger | undefined>({});
if (forgeLogger) {
  expectType<FastifyBaseLogger>(forgeLogger);
  expectType<void>(forgeLogger.debug({ msg: "hey" }));
  expectType<void>(forgeLogger.info({ msg: "oh!" }));
  expectType<void>(forgeLogger.warn({ msg: "let's go!!!" }));
}

// start
expectType<void>(await start(fastifyInstance));
expectError<void>(await start({ invalid: "object" }));
expectError<void>(await start());
