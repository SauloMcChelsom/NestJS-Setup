import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PublicationRepository } from './publication.repository'

import { FirebaseModel } from '@modules/firebase/firebase.model'
import { OK, NotFoundExceptions, ConflictExceptions } from '@service/exception'
import { code, message } from '@shared/enum'
import { UserModel } from '@modules/user/user.model'
import { PageModel } from '@modules/page/page.model'

import { CreateNewPublicationDto } from './dto/create-new-publication.dto'
import { UpdatePublicationDto  } from './dto/update-publication.dto'
import { RetornoDto  } from './dto/retorno.dto'

@Injectable()
export class PublicationService {

  constructor(
    @InjectRepository(PublicationRepository) private readonly repository: PublicationRepository,
    private modelFirebase:FirebaseModel,
    private modelUser:UserModel,
    private modelPage:PageModel
  ) {}

  public async createNewPublications(post:CreateNewPublicationDto, token:string) {
    let body = await this.modelFirebase.isToken(token)
    const decoded = await this.modelFirebase.validateTokenByFirebase(body)
    const user = await this.modelUser.getUserByUid(decoded.uid)
    //encontra a pagina, ultilizando o id do usuario no token e id da pagina que passou no body
    //se não correponderem, significa que o sistema esta sendo testado por terceiros
    await this.modelPage.findPageByIdOfUserAndIdOfPage(user.id.toString(), post.page_id.toString())

    post.number_of_likes = 0

    const res = await this.repository.save(post)
    return new OK([res], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }

  public async updatePublication(id:string, body:UpdatePublicationDto|any, token:string) {
    await this.repository.update(id, body);
    const res = await this.repository.findOne(id)
    return new OK([res], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publication(id:any) {
    /**
     * buscar da tabela 
     *    pagina
     *    publicação
     *    comentario: 0 - 5 por atual
     *    
     */
    const res = await this.repository.findOne({ where:{ id: id }})
    return new OK([res], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async feed() {
    /**
     * buscar da tabela 
     *    pagina
     *    publicação
     * 
     * rotina:
     *   - das paginas que sigo trazer as atuais para as antigas
     *   - as mais curtidas
     *   - as paginas com mais seguidores
     *   - as mais commentadas
     * 
     *   - das que não sigo, mais esta em alta
     *   - as mais curtidas
     *   - as paginas com mais seguidores
     *   - as mais commentadas
     * 
     * ordenação:
     *   0 - 5
     * 
     */
    return await this.repository.feed();
  }

  public async search(query:string){
    

  }

}

