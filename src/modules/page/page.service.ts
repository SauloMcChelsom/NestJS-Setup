import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PageRepository } from './page.repository'
import { PageModel } from './page.model'
import { FirebaseModel } from '@root/src/modules/firebase/firebase.model'
import { UserModel } from '@root/src/modules/user/user.model'
import { CreateNewPageDto } from './dto/createNewPage.dto'
import { OK, NotFoundExceptions, ConflictExceptions } from '@service/exception'
import { code, message } from '@shared/enum'
import { UpdateDto  } from './dto/update.dto'
import { RetornoDto  } from './dto/retorno.dto'

@Injectable()
export class PageService {

  constructor(
    @InjectRepository(PageRepository) private readonly repository: PageRepository,
    private model:PageModel,
    private modelFirebase:FirebaseModel,
    private modelUser:UserModel,
  ) {}

  public async save(page:CreateNewPageDto, token:string) {
    let body = await this.modelFirebase.isToken(token)
    const decoded = await this.modelFirebase.validateTokenByFirebase(body)
    const user = await this.modelUser.getUserByUid(decoded.uid)
    
    await this.model.pageAlreadyExist(page.page_name)

    page.user_id = user.id
    page.number_of_followers = 0
    const res = await this.repository.save(page)
    return new OK([res], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }

  public async findOneByName(page:string) {
    const res = await this.repository.findOne({ where:{ page_name: page }})

    if(res == null){
      throw new NotFoundExceptions({
        code:code.NOT_FOUND,
        message:message.NOT_FOUND,
      })
    }

    return new OK([res], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async findOneById(id:string) {
    const res = await this.repository.findOne({ where:{ id: id }})

    if(res == null){
      throw new NotFoundExceptions({
        code:code.NOT_FOUND,
        message:message.NOT_FOUND,
      })
    }

    return new OK([res], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async findAll() {
    const res = await this.repository.find();
    const all =  res.map((r)=> new RetornoDto(r))
    return new OK([all], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async update(page:any, id:string, token:string) {
    let body = await this.modelFirebase.isToken(token)
    const decoded = await this.modelFirebase.validateTokenByFirebase(body)

    await this.repository.update(id, page);
    const res = await this.repository.findOne(id)
    return new OK([res], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }

}

