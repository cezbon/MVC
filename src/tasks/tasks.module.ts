import { Module } from '@nestjs/common';
import { TasksApiController } from './tasks-api.controller.js';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';

// Moduł spina Kontrolery i Serwis (Model) w jedną całość
@Module({
  controllers: [TasksController, TasksApiController],
  providers: [TasksService],
})
export class TasksModule {}
