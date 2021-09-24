import {
    buildPlaceholder,
    buildTemplatedApiExceptionDecorator,
  } from '@nanogiants/nestjs-swagger-api-exception-decorator';
  //import { BaseException } from '@shared/exception';
  
  export const TemplatedApiException = buildTemplatedApiExceptionDecorator(
    {
      statusCode: '$status',
      clientCode: '$clientCode',
      message: '$description',
      errors: {
        cpfCnpj: ['cpfCnpj is invalid or has a wrong mask'],
      },
      path: '/v1/foo/bar',
      timestamp: '2021-04-21T12:15:10.389Z',
    },
    {
      requiredProperties: ['timestamp', 'path'],
      placeholders: {
        clientCode: buildPlaceholder(
          () => BaseException,
          (exception) => exception.getClientCode(),
        ),
      },
    },
  );

  
import { HttpStatus } from '@nestjs/common';


import { HttpException, ValidationError } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(
    response: string | Record<string, any>,
    status: number,
    private clientCode: number,
    private errors: ValidationError[] = undefined,
  ) {
    super(response, status);
  }

  getClientCode() {
    return this.clientCode;
  }

  getErrors() {
    return this.errors;
  }
}

export class ClienteNaoEncontradoException extends BaseException {
  constructor() {
    super('Cliente não encontrado', HttpStatus.NOT_FOUND, 4002);
  }
}