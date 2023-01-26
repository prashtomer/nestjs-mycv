import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  // context is kind of a wrapper around the incoming request
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) {
      return false;
    }
    // This will not work as the currentUser interceptor will run after this guard hence create a current user middleware to extract the user and make it available on the request
    return request.currentUser.admin;
  }
}
