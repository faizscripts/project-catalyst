import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { InitiativesModule } from '../initiatives/initiatives.module';

@Module({
  imports: [InitiativesModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
