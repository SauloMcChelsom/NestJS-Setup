import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FollowRepository } from './follow.repository'
import { FollowModel } from './follow.model'
import { PageModel } from '@modules/page/page.model'
import { FirebaseModel } from '@root/src/modules/firebase/firebase.model'
import { CreateFollowPageDto } from './dto/createNewPage.dto'
import { OK, NotFoundExceptions, ConflictExceptions } from '@service/exception'
import { code, message } from '@shared/enum'
import { UpdateDto  } from './dto/update.dto'
import { RetornoDto  } from './dto/retorno.dto'

@Injectable()
export class FollowService {

  constructor(
    @InjectRepository(FollowRepository) private readonly repository: FollowRepository,
    private validateFirebase:FirebaseModel,
    private model:FollowModel,
    private pageModel:PageModel
  ) {}

  public async save(body:CreateFollowPageDto) {
    body.i_am_following = true
    return await this.repository.save(body)
  }

  public async findByIdPage(id: string, token: string) {
    //let tokenOfBody = await this.validateFirebase.isToken(token)
    //await this.validateFirebase.validateTokenByFirebase(tokenOfBody)

    const res = await this.repository.findAllUserFollowPageByIdOfPage(id)

    if(Object.keys(res).length == 0){
      throw new NotFoundExceptions({
        code:code.NO_REGISTRY,
        message:message.NO_REGISTRY,
      })
    }

    return new OK(res, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async findByIdUser(id: string, token: string) {
    //let tokenOfBody = await this.validateFirebase.isToken(token)
    //await this.validateFirebase.validateTokenByFirebase(tokenOfBody)

    const res = await this.repository.findAllPageUserFollowByIdOfUser(id)

    if(Object.keys(res).length == 0){
      throw new NotFoundExceptions({
        code:code.NO_REGISTRY,
        message:message.NO_REGISTRY,
      })
    }

    return new OK(res, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async followPage(body:CreateFollowPageDto, token:string) {
 
    let tokenOfBody = await this.validateFirebase.isToken(token)
    await this.validateFirebase.validateTokenByFirebase(tokenOfBody)

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
        return new OK([res], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
      }else{
        //se não, atualizar para 'começar a seguir' e atualizar o contator na tabela page ++
        await this.model.updateAmFollowing(segments.id.toString(), {i_am_following:true})
        await this.pageModel.incrementNumberFollowersPage(segments.page_id)

        let res = await this.model.getPageUserFollow(body.user_id.toString(), body.page_id.toString())
        return new OK([res], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
      }
    }else{
      //se não houver registro, criar um registro ja seguindo e atualizar o contator na tabela page ++
      await this.save(body)
      let segments = await this.model.getPageUserFollow(body.user_id.toString(), body.page_id.toString())
      await this.pageModel.incrementNumberFollowersPage(segments.page_id)

      let res = await this.model.getPageUserFollow(body.user_id.toString(), body.page_id.toString())
      return new OK([res], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
    }
  }
}
