import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// param decorator doesn't have access to userService instance from Dependency Injection container hence we will use interceptor to get the user by usersService
export const CurrentUser = createParamDecorator(
  // context is like a wrapper around the incoming request
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
