import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PageFollowRepository } from './page-follow.repository'
import { PageFollowModel } from './page-follow.model'
import { FirebaseModel } from '@root/src/modules/firebase/firebase.model'
import { CreateNewPageDto } from './dto/createNewPage.dto'
import { OK, NotFoundExceptions, ConflictExceptions } from '@service/exception'
import { code, message } from '@shared/enum'
import { UpdateDto  } from './dto/update.dto'
import { RetornoDto  } from './dto/retorno.dto'

@Injectable()
export class PageFollowService {

  constructor(
    @InjectRepository(PageFollowRepository) private readonly repository: PageFollowRepository,
    private validateFirebase:FirebaseModel,
    private model:PageFollowModel
  ) {}

  public async save(body:CreateNewPageDto, token:string) {
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
}
/**
 * ajustar nome das resposta da mensagem code/message - aalguns estão apresetando texto trocados
 * criar a funcionalidade seguir/para de seguir
 */
