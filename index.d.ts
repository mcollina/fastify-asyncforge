import {
  type FastifyInstance,
  type FastifyBaseLogger,
  type FastifyReply,
  type FastifyRequest,
  type FastifyPluginCallback,
} from "fastify";

declare namespace fastifyasyncforge {
  export function app<T extends FastifyInstance>(): T;
  export function request<T extends FastifyRequest>(): T;
  export function reply<T extends FastifyReply>(): T;
  export function logger<T extends FastifyBaseLogger>(): T;
}

declare function fastifyasyncforge(): FastifyPluginCallback;
export = fastifyasyncforge;
