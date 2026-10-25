import { Injectable } from '@nestjs/common';

export interface Data {
  title: string;
  message: string;
  now: string;
}

@Injectable()
export class AppService {
  getHello(): Data {
    return {
      title: 'Start',
      message: 'Dziala Nest i Ejs',
      now: new Date().toLocaleString(),
    };
  }
}
