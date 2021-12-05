import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PageFollowRepository } from './page-follow.repository'
import { PageFollowModel } from './page-follow.model'
import { PageModel } from '@modules/page/page.model'
import { FirebaseModel } from '@root/src/modules/firebase/firebase.model'
import { CreateFollowPageDto } from './dto/createNewPage.dto'
import { OK, NotFoundExceptions, ConflictExceptions } from '@service/exception'
import { code, message } from '@shared/enum'
import { UpdateDto  } from './dto/update.dto'
import { RetornoDto  } from './dto/retorno.dto'

@Injectable()
export class PageFollowService {

  constructor(
    @InjectRepository(PageFollowRepository) private readonly repository: PageFollowRepository,
    private validateFirebase:FirebaseModel,
    private model:PageFollowModel,
    private pageModel:PageModel
  ) {}

  public async save(body:CreateFollowPageDto, token:string) {
    //let tokenOfBody = await this.validateFirebase.isToken(token)
    //await this.validateFirebase.validateTokenByFirebase(tokenOfBody)
    await this.model.pageFollowAlreadyExist(body.user_id.toString(), body.page_id.toString())

    body.i_am_following = true
    const res = await this.repository.save(body)
    return new OK([res], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }

  public async findByIdPage(id: string, token: string) {
    const res = await this.model.findByIdPage(id)
    return new OK(res, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async findByIdUser(id: string, token: string) {
    const res = await this.model.findByIdUser(id)
    return new OK(res, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async update(body:any, id:string, token:string) {
    let tokenOfBody = await this.validateFirebase.isToken(token)
    const decoded = await this.validateFirebase.validateTokenByFirebase(tokenOfBody)

    await this.model.updateAmFollowing(id, body)
    const res = await this.repository.findOne(id)
    return new OK([res], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }

  public async followPage(body:CreateFollowPageDto, token:string) {
    var res
    //let tokenOfBody = await this.validateFirebase.isToken(token)
    //await this.validateFirebase.validateTokenByFirebase(tokenOfBody)

    //verificar se o usuario ja seguiu a pagina
    let follow = await this.model.userFollowPage(body.user_id.toString(), body.page_id.toString())
    
    if(follow){
      //se houver registro,  verifica se esta seguindo
      let segments = await this.model.getPageUserFollow(body.user_id.toString(), body.page_id.toString())
          res = segments//del
      if(segments.i_am_following){
        //se sim, atualiza para 'para de seguir' e atualizar o contator na tabela page para --
        await this.model.updateAmFollowing(segments.id.toString(), {i_am_following:false})
        res.i_am_following = false//del

        await this.pageModel.decrementNumberFollowersPage(segments.page_id)
      }else{
        //se não, atualizar para 'começar a seguir' e atualizar o contator na tabela page ++
        await this.model.updateAmFollowing(segments.id.toString(), {i_am_following:true})
        res.i_am_following = true

        await this.pageModel.incrementNumberFollowersPage(segments.page_id)
      }
    }else{
      //se não houver registro, criar um registro ja seguindo e atualizar o contator na tabela page ++
      await this.save(body, '')
      let segments = await this.model.getPageUserFollow(body.user_id.toString(), body.page_id.toString())
      await this.pageModel.incrementNumberFollowersPage(segments.page_id)
    }


    return new OK([res]) 
  }
}
/**
 * -------nova funcionalidade-----
 * 
 * -quantas pessoas te seguem
 * 
 * -quantas pessoas te seguiram. ex: os que te seguem e os que pararam
 * 
 * -quantas pessoas pararam de te seguir
 * 
 * -quantas pessoas voltaram a te seguir
 * 
 * -quantas pessoas voltaram a te seguir por periodo, ex: no mês de out-dez x pessoas voltaram
 * 
 * -quantas pessoas pararam a te seguir por periodo, ex: no mês de out-dez x pessoas voltaram
 * 
 */
