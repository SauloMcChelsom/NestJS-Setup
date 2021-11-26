import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PageRepository } from './page.repository'
import { PageValidate } from './page.validate'
import { FirebaseValidate } from '@modules/firebase/firebase.validate'
import { UserValidate } from '@modules/user/user.validate'
import { CreateNewPageDto } from './dto/createNewPage.dto'
import { OK, NotFoundExceptions, ConflictExceptions } from '@service/exception'
import { code, message } from '@shared/enum'
import { UpdateDto  } from './dto/update.dto'
import { RetornoDto  } from './dto/retorno.dto'

@Injectable()
export class PageService {

  constructor(
    @InjectRepository(PageRepository) private readonly repository: PageRepository,
    private validate:PageValidate,
    private validateFirebase:FirebaseValidate,
    private validateUser:UserValidate,
  ) {}

  public async save(page:CreateNewPageDto, token:string) {
    let body = await this.validateFirebase.isToken(token)
    const decoded = await this.validateFirebase.validateTokenByFirebase(body)
    const user = await this.validateUser.getUserByUid(decoded.uid)
    await this.validate.pageAlreadyExist(page.page_name)

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
    let body = await this.validateFirebase.isToken(token)
    const decoded = await this.validateFirebase.validateTokenByFirebase(body)

    await this.repository.update(id, page);
    const res = await this.repository.findOne(id)
    return new OK([res], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }

  public async follow(token:string) {
    let body = await this.validateFirebase.isToken(token)
    const decoded = await this.validateFirebase.validateTokenByFirebase(body)
 
    return new OK([], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }
}
