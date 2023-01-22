import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        // convert the User entity instance ie data into User dto
        return plainToClass(this.dto, data, {
          // will take care of properties marked as exposed inside the User dto and rest is stripped off from the response ie email
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
