import { Controller, Get, NotFoundException, Param, ParseIntPipe, Render } from '@nestjs/common';
import { TasksService } from './tasks.service.js';

// C – "chudy" kontroler: odbiera żądanie, pyta Model, wybiera Widok.
@Controller('tasks')
export class TasksController {
  // Nest sam wstrzykuje serwis (Dependency Injection) – nie robimy "new TasksService()"
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @Render('tasks/index')
  list() {
    return {
      title: 'Zadania',
      tasks: this.tasksService.findAll(),
      stats: this.tasksService.stats(),
    };
  }

  // ParseIntPipe zamienia "/tasks/2" na liczbę 2, a "/tasks/abc" kończy błędem 400
  @Get(':id')
  @Render('tasks/show')
  show(@Param('id', ParseIntPipe) id: number) {
    const task = this.tasksService.findOne(id);
    if (!task) throw new NotFoundException(`Brak zadania o id ${id}`);
    return { title: task.title, task };
  }
}
