import { Injectable } from '@nestjs/common';
import { CreateResult, CreateTaskInput, Task, TaskStats } from './task.entity.js';

export const ALLOWED_GRADES = [2, 3, 3.5, 4, 4.5, 5];

// M – logika biznesowa i dane. Na razie "baza" to tablica w pamięci.
// Serwis zwraca surowe obiekty – nie wie, czy trafią do EJS, czy do JSON-a.
@Injectable()
export class TasksService {
  private tasks: Task[] = [
    new Task(1, 'Przeczytać o wzorcu MVC', 5, true),
    new Task(2, 'Zainstalować Nest CLI', 4.5, true),
    new Task(3, 'Napisać pierwszy kontroler', null),
  ];
  private nextId = 4;

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  // Walidacja biznesowa jest w Modelu, a nie w kontrolerze ani w widoku
  create(input: CreateTaskInput): CreateResult {
    const title = String(input.title ?? '').trim();
    const gradeText = String(input.grade ?? '').trim().replace(',', '.');
    const errors: string[] = [];

    if (title.length < 3 || title.length > 80) {
      errors.push('Tytuł musi mieć od 3 do 80 znaków.');
    }
    if (this.tasks.some((t) => t.title.toLowerCase() === title.toLowerCase())) {
      errors.push('Zadanie o takim tytule już istnieje.');
    }

    let grade: number | null = null;
    if (gradeText !== '') {
      grade = Number(gradeText);
      if (!ALLOWED_GRADES.includes(grade)) {
        errors.push(`Ocena musi być jedną z: ${ALLOWED_GRADES.join(', ')}.`);
      }
    }

    if (errors.length > 0) {
      return { ok: false, errors };
    }

    const task = new Task(this.nextId++, title, grade);
    this.tasks.push(task);
    return { ok: true, task };
  }

  toggle(id: number): Task | undefined {
    const task = this.findOne(id);
    if (task) task.done = !task.done;
    return task;
  }

  remove(id: number): boolean {
    const before = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return this.tasks.length < before;
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
