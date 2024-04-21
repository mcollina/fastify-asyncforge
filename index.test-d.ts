import { expectAssignable, expectError, expectType } from "tsd";
import { app, logger, reply, request } from ".";
import fastify, {
  type FastifyInstance,
  type FastifyBaseLogger,
  type FastifyRequest,
  type FastifyReply,
} from "fastify";

const fastifyInstance = fastify();
const appInstance = app();

// app
expectAssignable<FastifyInstance>(fastifyInstance);
expectAssignable<FastifyInstance>(appInstance);
expectError<FastifyInstance>({});

// request
expectType<FastifyRequest>(request);
expectType<unknown>(request.body);
expectType<boolean>(request.is404);
expectError<FastifyRequest>({});

// reply
expectType<FastifyReply>(reply);
expectType<number>(reply.statusCode);
expectType<boolean>(reply.sent);
expectError<FastifyReply>({});

// logger
expectType<FastifyBaseLogger>(fastifyInstance.log);
expectType<FastifyBaseLogger>(logger);
expectType<void>(logger.debug({ msg: "hey" }));
expectType<void>(logger.info({ msg: "oh!" }));
expectType<void>(logger.warn({ msg: "let's go!!!" }));
expectError<FastifyBaseLogger>({});
