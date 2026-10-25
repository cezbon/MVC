import { Controller, Get, Render } from '@nestjs/common';
import { AppService, type Data } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello(): Data {
    return this.appService.getHello();
  }
}
