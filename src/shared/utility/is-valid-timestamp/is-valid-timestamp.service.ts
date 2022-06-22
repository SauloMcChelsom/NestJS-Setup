import { Injectable } from '@nestjs/common';
import { code } from '@root/src/shared/enum';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class IsValidTimestampService {
  public run(timestamp: string) {
    //'2021-12-20 23:59:59',
    const ano = parseInt(timestamp.substr(0, 4));
    const trace_1 = timestamp.substr(4, 1);
    const mes = parseInt(timestamp.substr(5, 2));
    const trace_2 = timestamp.substr(7, 1);
    const dia = parseInt(timestamp.substr(8));

    const valid = new Date(timestamp).getTime() > 0;
    if (!valid) {
        throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Timestamp Invalida',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
    }

    if (!(timestamp.length >= 10 && timestamp.length <= 19)) {
      throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Deve conter entre 10 a 19 caracteres.',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
    }

    if (timestamp.length == 19) {
      const space = timestamp.substr(10, 1);
      const hours = parseInt(timestamp.substr(11, 2));
      const two_point_1 = timestamp.substr(13, 1);
      const minutes = parseInt(timestamp.substr(14, 2));
      const two_point_2 = timestamp.substr(16, 1);
      const seconds = parseInt(timestamp.substr(17, 2));

      if (!(trace_1 == '-' && trace_2 == '-')) {
        throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Deve conter o caracter "traço" (-) ente o lado direito e esquerdo do mês',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      if (!(space == ' ')) {
        throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Deve haver um espaço entre a data e a hora',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      if (!(two_point_1 == ':' && two_point_2 == ':')) {
        throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Deve conter o caracter "dois-pontos" (:) ente o lado direito e esquerdo do minutos',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      if (!(ano >= 1900 && ano <= 3000)) {
        throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Deve estar entre o intervalo de mil e novecentos (1900) á três mil (3000)',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      if (!(mes >= 1 && mes <= 12)) {
        throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Deve estar entre o intervalo de um (1) á 12 (doze)',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      if (!(dia >= 1 && dia <= 31)) {
        throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Deve estar entre o intervalo de um (1) á trinta e um (31)',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      if (!(hours >= 0 && hours <= 23)) {
        throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Deve estar entre o intervalo de zero (00) ás vinte e três horas (23)',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      if (!(minutes >= 0 && minutes <= 59)) {
        throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Deve estar entre o intervalo de zero (00) ás cinquenta e nove minutos (59)',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      if (!(seconds >= 0 && seconds <= 59)) {
        throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Deve estar entre o intervalo de zero (00) ás cinquenta e nove seguntos (59)',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      return timestamp;
    }

    if (timestamp.length == 10) {
      if (!(trace_1 == '-' && trace_2 == '-')) {
        throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Deve conter o caracter "traço" (-) ente o lado direito e esquerdo do mês',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      if (!(ano >= 1900 && ano <= 3000)) {
        throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Deve estar entre o intervalo de mil e novecentos (1900) á três mil (3000)',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      if (!(mes >= 1 && mes <= 12)) {
        throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Deve estar entre o intervalo de um (1) á 12 (doze)',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      if (!(dia >= 1 && dia <= 31)) {
        throw new HttpException({
          code : code.TIMESTAMP_FAILED,
          message : [
            'Deve estar entre o intervalo de um (1) á trinta e um (31)',
            'Exemplo de um timestamp: "2021-12-20" ou "2021-12-20 15:18:49"',
          ],
          description : ''
        }, HttpStatus.BAD_REQUEST)
      }

      return timestamp + ' 23:59:59';
    }

    return '';
  }
}
