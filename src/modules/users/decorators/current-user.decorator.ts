import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return data
      ? ctx.req.user && ctx.req.user[data]
      : ctx.req.user;
  }
);
