import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Controller, UseGuards, Get, Post, ParseIntPipe, Param, HttpException, HttpStatus, UseFilters, Body, ForbiddenException } from '@nestjs/common';

@Injectable()
export class PublicParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Validation failed',
    }, HttpStatus.FORBIDDEN);
    }
    return val;
  }
}