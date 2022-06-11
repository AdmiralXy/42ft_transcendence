import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/home')
  home(): string {
    return 'This is home!';
  }

  @Get('api/home')
  api(): string {
    return 'This is api home!';
  }
}
