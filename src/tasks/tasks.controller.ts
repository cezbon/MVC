import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  Render,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import type { CreateTaskInput } from './task.entity.js';
import { ALLOWED_GRADES, TasksService } from './tasks.service.js';

// C – "chudy" kontroler: odbiera żądanie, pyta Model, wybiera Widok.
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @Render('tasks/index')
  list() {
    return {
      title: 'Zadania',
      tasks: this.tasksService.findAll(),
      stats: this.tasksService.stats(),
      grades: ALLOWED_GRADES,
      errors: [],
      values: {},
    };
  }

  @Post()
  create(@Body() body: CreateTaskInput, @Res() res: Response) {
    const result = this.tasksService.create(body);
    if (result.ok) {
      // Wzorzec Post/Redirect/Get – odświeżenie strony nie doda zadania drugi raz
      return res.redirect('/tasks');
    }
    return res.status(400).render('tasks/index', {
      title: 'Zadania',
      tasks: this.tasksService.findAll(),
      stats: this.tasksService.stats(),
      grades: ALLOWED_GRADES,
      errors: result.errors,
      values: body,
    });
  }

  @Get(':id')
  @Render('tasks/show')
  show(@Param('id', ParseIntPipe) id: number) {
    const task = this.tasksService.findOne(id);
    if (!task) throw new NotFoundException(`Brak zadania o id ${id}`);
    return { title: task.title, task };
  }

  @Post(':id/toggle')
  @Redirect('/tasks')
  toggle(@Param('id', ParseIntPipe) id: number) {
    if (!this.tasksService.toggle(id)) throw new NotFoundException();
  }

  @Post(':id/delete')
  @Redirect('/tasks')
  remove(@Param('id', ParseIntPipe) id: number) {
    if (!this.tasksService.remove(id)) throw new NotFoundException();
  }
}
