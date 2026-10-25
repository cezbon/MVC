import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { TasksModule } from './tasks/tasks.module.js';

@Module({
  imports: [TasksModule],
  controllers: [AppController],
})
export class AppModule {}
