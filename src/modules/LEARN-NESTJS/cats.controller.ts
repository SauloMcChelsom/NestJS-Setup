import {  Controller, UseGuards, UseInterceptors, Get, Post, Query,ParseIntPipe, Param, HttpException, HttpStatus, UseFilters, Body, ForbiddenException } from '@nestjs/common';

import {  HttpExceptionFilter } from './exception/http-exception.filter'
import {  CreateDto } from './parseInt.pipe'
import {  CatsService } from './cats.service'
import {  UpdateFlowInterceptor } from './exception/http.Interceptor'

@Controller('cats')
export class CatsController {

    constructor(private catsService:CatsService){}

    @Post(':id')
    @UseFilters(HttpExceptionFilter)
    @UseInterceptors(UpdateFlowInterceptor)
    async create(@Body() createCatDto: CreateDto, @Param('id') id: any, @Query('search') search:string, @Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string, @Query('start') start:string, @Query('end') end:string) {
        let cls = {
            search:search, 
            limit:parseInt(limit) ? parseInt(limit) : 5, 
            offset:parseInt(offset) ? parseInt(offset) : 0, 
            order:order, 
            column:column, 
            start:start, 
            end:end
        }

        return this.catsService.findOne(createCatDto, id,cls);
    }

}