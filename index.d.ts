import { memo } from "asyncforge";
import {
  type FastifyInstance,
  type FastifyBaseLogger,
  type FastifyReply,
  type FastifyRequest,
} from "fastify";

declare namespace fastifyasyncforge {
  type MemoFn<T> = ReturnType<typeof memo<T>>;

  export const app: MemoFn<FastifyInstance>;
  export const request: MemoFn<FastifyRequest>;
  export const reply: MemoFn<FastifyReply>;
  export const logger: MemoFn<FastifyBaseLogger>;
}

export = fastifyasyncforge;
