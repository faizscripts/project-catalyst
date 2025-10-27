import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { InitiativesModule } from './initiatives/initiatives.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
      PrismaModule,
      InitiativesModule,
      TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
