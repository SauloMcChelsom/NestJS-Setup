import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  transform(value: string): string {


    return value
  }
}