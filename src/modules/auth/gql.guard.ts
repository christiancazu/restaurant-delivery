import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
