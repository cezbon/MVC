import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import type { CreateTaskInput } from './task.entity.js';
import { TasksService } from './tasks.service.js';

// Drugi kontroler, ten sam Model. Zamiast EJS zwraca JSON (np. dla aplikacji mobilnej).
// Serwis nie zmienił się ani o jedną linię – to jest zysk z rozdzielenia warstw.
@Controller('api/tasks')
export class TasksApiController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  list() {
    return { tasks: this.tasksService.findAll(), stats: this.tasksService.stats() };
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    const task = this.tasksService.findOne(id);
    if (!task) throw new NotFoundException(`Brak zadania o id ${id}`);
    return task;
  }

  @Post()
  create(@Body() body: CreateTaskInput) {
    const result = this.tasksService.create(body);
    if (!result.ok) throw new BadRequestException(result.errors);
    return result.task;
  }
}
