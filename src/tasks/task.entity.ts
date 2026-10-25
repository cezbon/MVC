// M – struktura danych. Klasa nie wie nic o HTML, URL-ach ani HTTP.
export class Task {
  constructor(
    public readonly id: number,
    public title: string,
    public grade: number | null,
    public done: boolean = false,
  ) {}
}

export interface TaskStats {
  total: number;
  done: number;
  average: number | null;
}
