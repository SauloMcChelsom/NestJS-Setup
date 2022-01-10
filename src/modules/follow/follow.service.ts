import { Injectable } from '@nestjs/common'

import { code, message } from '@shared/enum'
import { ClassificationInterface } from '@shared/interfaces'
import { PageModel } from '@modules/page/page.model'
import { OK } from '@service/exception'

import { FollowModel } from './follow.model'
import { CreateInterface } from './interface/create.interface'
import { AuthListMapper, CreateMapper } from './mapper'


@Injectable()
export class FollowService {

  constructor(
    private model:FollowModel, 
    private pageModel:PageModel,
    private authListMapper:AuthListMapper,
    private createFallowMapper:CreateMapper
  ) {}

  public async authListByIdPage(id: string, cls:ClassificationInterface) {
    const res = await this.model.listAllUserFollowPageByIdOfPage(id, cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end)
    const dto = res.map((r)=> this.authListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async authListByIdUser(id: string, cls:ClassificationInterface) {
    const res = await this.model.listAllPageUserFollowByIdOfUser(id, cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end)
    const dto = res.map((r)=> this.authListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async create(body:CreateInterface) {
 
    //verificar se o usuario ja seguiu a pagina
    let follow = await this.model.userAlreadyFollowPage(body.user_id.toString(), body.page_id.toString())
    
    if(follow){
      //se houver registro,  verifica se esta seguindo
      let segments = await this.model.getPageUserFollow(body.user_id.toString(), body.page_id.toString())
   
      if(segments.i_am_following){
        //se sim, atualiza para 'para de seguir' e atualizar o contator na tabela page para --
        await this.model.updateAmFollowing(segments.id.toString(), {i_am_following:false})
        await this.pageModel.decrementNumberFollowersPage(segments.page_id)

        let res = await this.model.getPageUserFollow(body.user_id.toString(), body.page_id.toString())
        const dto = this.createFallowMapper.toMapper(res)
        return new OK([dto], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
      }else{
        //se não, atualizar para 'começar a seguir' e atualizar o contator na tabela page ++
        await this.model.updateAmFollowing(segments.id.toString(), {i_am_following:true})
        await this.pageModel.incrementNumberFollowersPage(segments.page_id)

        let res = await this.model.getPageUserFollow(body.user_id.toString(), body.page_id.toString())
        const dto = this.createFallowMapper.toMapper(res)
        return new OK([dto], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
      }
    }else{
      //se não houver registro, criar um registro ja seguindo e atualizar o contator na tabela page ++
      await this.model.save(body)
      let segments = await this.model.getPageUserFollow(body.user_id.toString(), body.page_id.toString())
      await this.pageModel.incrementNumberFollowersPage(segments.page_id)

      let res = await this.model.getPageUserFollow(body.user_id.toString(), body.page_id.toString())
      const dto = this.createFallowMapper.toMapper(res)
      return new OK([dto], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
    }
  }
}
