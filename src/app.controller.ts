import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  // Strona główna przekierowuje na listę zadań
  @Get()
  @Redirect('/tasks')
  home() {}
}
