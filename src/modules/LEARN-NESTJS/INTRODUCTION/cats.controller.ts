import {  Controller, UseGuards, Get, Post, ParseIntPipe, Param, HttpException, HttpStatus, UseFilters, Body, ForbiddenException } from '@nestjs/common';
import {  ApiOperation, ApiTags } from '@nestjs/swagger'
import {  ForbiddenExceptions } from './forbidden.exception'
import {  AuthGuard } from '@nestjs/passport';
import {  HttpExceptionFilter } from './http-exception.filter'
import {  ValidationPipe } from './validation.pipe'
import {  PublicParseIntPipe } from './parseInt.pipe'
import {  RolesGuard } from './roles.guard'
import {  Roles } from './roles.decorador'

import { CatsService } from './cats.service'

@ApiTags('cats')
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {

    constructor(private catsService:CatsService){}

    @Get('/0')
    @Roles('admin')
    @UseFilters(HttpExceptionFilter)
    async create5(@Body() createCatDto: any) {
        return this.catsService.findOne(createCatDto);
    }

    @Get('/01')
    @UseGuards(AuthGuard('jwt'))
    @UseFilters(HttpExceptionFilter)
    async create6(@Body() createCatDto: any) {
        return this.catsService.findOne(createCatDto);
    }

    @Get('/1')
    async create4(@Body(new ValidationPipe()) createCatDto: any) {
        this.catsService.create(createCatDto);
    }

    @Get('/2')
    @UseFilters(HttpExceptionFilter)
    async create3(@Body() createCatDto: any) {
        throw new ForbiddenException();
    }

    @Get('/3/:id')
    @UseFilters(HttpExceptionFilter)
    async findOne2(@Param('id', new PublicParseIntPipe()) id) {
        return this.catsService.findOne(id);
    }



}
