import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        // convert the User entity instance ie data into User dto
        return plainToClass(UserDto, data, {
          // will take care of properties marked as exposed inside the User dto and rest is stripped off from the response ie email
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
