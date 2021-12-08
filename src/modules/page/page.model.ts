import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { code, message } from '@shared/enum'
import { 
  ConflictExceptions, 
  InternalServerErrorExceptions,
  BadRequestExceptions,
  NotFoundExceptions
} from '@service/exception'
import { PageRepository } from './page.repository'


@Injectable()
export class PageModel {

  constructor(@InjectRepository(PageRepository) private readonly repository: PageRepository) {}

  public async pageAlreadyExist(page:string) {
    try{
      const res = await this.repository.findOne({ where:{ page_name: page }})
      if(res){
        throw true
      }
    }catch(error){
      if(error == true){
        throw new ConflictExceptions({
          code:code.PAGE_ALREADY_IN_USE,
          message:message.PAGE_ALREADY_IN_USE,
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em verificar se a pagina ja existe "+` ::: ${error}`
      })
    }
  }

  public async findPageByIdOfUserAndIdOfPage(user_id:string, page_id:string) {
    try{
      const res = await this.repository.findOne({ where:{ user_id: user_id, id:page_id }})
      if(res){
        return res
      }
      throw true
    }catch(error){
      if(error == true){
        throw new ConflictExceptions({
          code:code.DATA_CONFLICT,
          message:"id do usuario no token e id da pagina no body, não coincide como chave composta",
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em encontra a pagina pelo id"+` ::: ${error}`
      })
    }
  }

  public async incrementNumberFollowersPage(id:any) {
    try{
      let page = await this.repository.findOne({ where:{ id: id }})
      if(typeof page?.number_of_followers == "number"){
        page.number_of_followers++ 
        await this.repository.update(page.id, { number_of_followers: page.number_of_followers });
      }
    }catch(error){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em incrementar o numero da pagina"+` ::: ${error}`
      })
    }
  }

  public async decrementNumberFollowersPage(id:any) { 
    try{
      let page = await this.repository.findOne({ where:{ id: id }})
      if(typeof page?.number_of_followers == "number"){
        page.number_of_followers--
        await this.repository.update(page.id, { number_of_followers: page.number_of_followers });
      }
    }catch(error){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em decrementar o numero da pagina"+` ::: ${error}`
      })
    }
  }
}

