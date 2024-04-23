import {
  type FastifyInstance,
  type FastifyBaseLogger,
  type FastifyReply,
  type FastifyRequest,
  type FastifyPluginCallback,
} from "fastify";

declare namespace fastifyasyncforge {
  export function app<T extends FastifyInstance>(): T | undefined;
  export function request<T extends FastifyRequest>(): T | undefined;
  export function reply<T extends FastifyReply>(): T | undefined;
  export function logger<T extends FastifyBaseLogger>(): T | undefined;
  export function start(app: FastifyInstance): Promise<void>;
}

declare function fastifyasyncforge(): FastifyPluginCallback;
export = fastifyasyncforge;
