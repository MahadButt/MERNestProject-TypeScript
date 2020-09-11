import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { AdminService } from './admin/admins.service';
import { AdminController } from './admin/admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admins } from './admins.entity';
 
@Module({
  imports: [
    TypeOrmModule.forFeature([Admins]),
  ],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'admin/signup', method: RequestMethod.POST },
        { path: 'admin/login', method: RequestMethod.POST }
      )
      .forRoutes(AdminController)
  }
}
