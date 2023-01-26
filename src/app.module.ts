import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DBOptions } from '../db.datasourceoptions';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const dbConfig = require('./db.datasourceoptions.js');

@Module({
  imports: [
    // configure environment variables based on environment
    ConfigModule.forRoot({
      // to make it globally available
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const dbOptions: TypeOrmModuleOptions = {
          // retryAttempts: 10,
          // retryDelay: 3000,
          // autoLoadEntities: false
        };

        Object.assign(dbOptions, DBOptions);

        return dbOptions;
      },
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // moved here from the main.ts so that it's also available in the integration tests inside the created module
    // Globally scoped pipe
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    // Globally scoped middleware
    consumer
      .apply(
        // moved here from the main.ts so that it's also available in the integration tests inside the created module
        cookieSession({
          // used for encrypting the cookie
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
