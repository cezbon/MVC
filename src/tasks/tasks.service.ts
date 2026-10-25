import { Injectable } from '@nestjs/common';
import { Task, TaskStats } from './task.entity.js';

// M – logika biznesowa i dane. Na razie "baza" to tablica w pamięci.
// Serwis zwraca surowe obiekty – nie wie, czy trafią do EJS, czy do JSON-a.
@Injectable()
export class TasksService {
  private tasks: Task[] = [
    new Task(1, 'Przeczytać o wzorcu MVC', 5, false),
    new Task(2, 'Zainstalować Nest CLI', 4.5, false),
    new Task(3, 'Napisać pierwszy kontroler', null),
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  // "Inteligentne" obliczenia (np. średnia) należą do Modelu
  stats(): TaskStats {
    const graded = this.tasks.filter((t) => t.grade !== null);
    const sum = graded.reduce((acc, t) => acc + (t.grade ?? 0), 0);
    return {
      total: this.tasks.length,
      done: this.tasks.filter((t) => t.done).length,
      average: graded.length ? Math.round((sum / graded.length) * 100) / 100 : null,
    };
  }
}
