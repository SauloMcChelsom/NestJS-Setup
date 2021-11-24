import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PageRepository } from './page.repository'
import { PageValidate } from './page.validate'
import { FirebaseValidate } from '@modules/firebase/firebase.validate'
import { UserValidate } from '@modules/user/user.validate'
import { CreateNewPageDto } from './dto/createNewPage.dto'
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
    return new RetornoDto(res)
  }

  public async findOne(id:any) {
    const res = await this.repository.findOne({ where:{ id: id }})
    return new RetornoDto(res)
  }

  public async findAll() {
    const res = await this.repository.find();
    return res.map((r)=> new RetornoDto(r))
  }

  public async update(id:any, values:any) {
    await this.repository.update(id, values);
    const res = await this.repository.findOne(id)
    return new RetornoDto(res)
  }

  public async delete(id:any) {
    await this.repository.delete(id);
    return {"mensagem":"deletado"}
  }
}

