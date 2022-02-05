import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { code } from '@root/src/lib/enum'
import { HttpStatusCodes as OK } from './exception/http-status-codes'

@Injectable()
export class CatsService {
  
  private readonly cats: any[] = [];

  public findOne(data, id, cls){

    if(parseInt(id)){
      id = parseInt(id)
    }
    
    if(typeof id === 'string'){
      throw new HttpException(code.SUCCESSFULLY_CREATED,500)
    }
    return new OK([{cats:"miau", data, id: id}], code.EMAIL_ALREADY_IN_USE, 'por favor ler a documentação', 5)
  }
}