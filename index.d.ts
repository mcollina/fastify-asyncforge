import fastify, {
  type FastifyBaseLogger,
  type FastifyReply,
  type FastifyRequest,
} from "fastify";

declare namespace fastifyasyncforge {
  export const app: typeof fastify;
  export const request: FastifyRequest;
  export const reply: FastifyReply;
  export const logger: FastifyBaseLogger;
}

export = fastifyasyncforge;
