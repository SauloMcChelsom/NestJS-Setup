import { Body, Controller, Get, Delete, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private readonly appService: CacheService) {}

  @Post()
  async add(@Body() cacheEntry: any) {
    await this.appService.add(cacheEntry.key, cacheEntry.item);
  }

  @Get(':key')
  async get(@Res() response, @Param('key') key) {
    const value = await this.appService.get(key);
    return response.status(HttpStatus.OK).json(value);
  }

  @Delete(':key')
  async delete(@Param('key') key) {
    return await this.appService.del(key);
  }

  @Delete()
  async reset() {
    return await this.appService.reset();
  }

}