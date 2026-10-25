// M – struktura danych. Klasa nie wie nic o HTML, URL-ach ani HTTP.
export class Task {
  constructor(
    public readonly id: number,
    public title: string,
    public grade: number | null,
    public done: boolean = false,
  ) {}
}

// Dane, które przychodzą z formularza albo z API (zawsze jako tekst)
export interface CreateTaskInput {
  title?: string;
  grade?: string | number;
}

export type CreateResult =
  | { ok: true; task: Task }
  | { ok: false; errors: string[] };

export interface TaskStats {
  total: number;
  done: number;
  average: number | null;
}
