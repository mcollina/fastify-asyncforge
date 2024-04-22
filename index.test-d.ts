import { expectAssignable, expectError, expectType } from "tsd";
import { app, logger, reply, request } from ".";
import fastify, {
  type FastifyInstance,
  type FastifyBaseLogger,
  type FastifyRequest,
  type FastifyReply,
} from "fastify";

const fastifyInstance = fastify();

// app
expectType<symbol>(app.key);
expectType<string>(app.name);
expectAssignable<Function>(app.set);
expectAssignable<FastifyInstance>(fastifyInstance);
expectAssignable<FastifyInstance>(app());
expectError<FastifyInstance>({});

// request
expectType<FastifyRequest>(request());
expectType<symbol>(request.key);
expectType<string>(request.name);
expectAssignable<Function>(request.set);
expectType<unknown>(request().body);
expectType<boolean>(request().is404);
expectError<FastifyRequest>({});

// reply
expectType<FastifyReply>(reply());
expectType<symbol>(reply.key);
expectType<string>(reply.name);
expectAssignable<Function>(reply.set);
expectType<number>(reply().statusCode);
expectType<boolean>(reply().sent);
expectError<FastifyReply>({});

// logger
expectType<FastifyBaseLogger>(fastifyInstance.log);
expectType<FastifyBaseLogger>(logger());
expectType<symbol>(logger.key);
expectType<string>(logger.name);
expectAssignable<Function>(logger.set);
expectType<void>(logger().debug({ msg: "hey" }));
expectType<void>(logger().info({ msg: "oh!" }));
expectType<void>(logger().warn({ msg: "let's go!!!" }));
expectError<FastifyBaseLogger>({});
