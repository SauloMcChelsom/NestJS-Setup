/*import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/cache')
  async addToCache(@Body() cacheEntry: any) {
    await this.appService.addToCache(cacheEntry.key, cacheEntry.item);
  }

  @Get('/cache/:key')
  async getFromCache(@Res() response, @Param('key') key) {
    const value = await this.appService.getFromCache(key);
    console.log(value)
    return response.status(HttpStatus.OK).json(value);
  }
}*/