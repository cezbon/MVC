import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';

// Moduł spina Kontroler i Serwis (Model) w jedną całość
@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
