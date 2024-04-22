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
expectAssignable<FastifyInstance>(fastifyInstance);
expectAssignable<FastifyInstance>(app());
expectAssignable<FastifyInstance>(app<FastifyInstance<RawServerDefault>>());
expectError<FastifyInstance>(app<string>());
expectError<FastifyInstance>({});

// request
expectType<FastifyRequest>(request());
expectType<FastifyRequest>(request<FastifyRequest<RouteGenericInterface>>());
expectError<FastifyRequest>(request<boolean>());
expectType<unknown>(request().body);
expectType<boolean>(request().is404);
expectError<FastifyRequest>({});

// reply
expectType<FastifyReply>(reply());
expectType<FastifyReply>(reply<FastifyReply<RawServerDefault>>());
expectType<number>(reply().statusCode);
expectType<boolean>(reply().sent);
expectError<FastifyReply>(reply<number>());
expectError<FastifyReply>({});

// logger
expectType<FastifyBaseLogger>(fastifyInstance.log);
expectType<FastifyBaseLogger>(logger());
expectType<FastifyBaseLogger>(logger<FastifyBaseLogger>());
expectType<void>(logger().debug({ msg: "hey" }));
expectType<void>(logger().info({ msg: "oh!" }));
expectType<void>(logger().warn({ msg: "let's go!!!" }));
expectError<FastifyBaseLogger>(logger<object>());
expectError<FastifyBaseLogger>({});

// start
expectType<void>(await start(fastifyInstance));
expectError<void>(await start({ invalid: "object" }));
expectError<void>(await start());
