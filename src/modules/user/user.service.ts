import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'

import { CryptUtilityService } from '../../shared/bcrypt/bcrypt.service'
import { UserRepository } from './user.repository'
import { OK, NotFoundExceptions } from '../../service/exception'
import { UserValidator } from './user.validator'
import { PerfilUserReturn } from './return/perfil-user.return'
import { checkIfUserExistsByEmailReturn  } from './return/check-If-user-exists-by-email.return'
import { code, message } from '../../shared/enum'
import { CreateNewUserDto } from './dto'
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository) 
    private readonly repository: UserRepository, 
    private validator:UserValidator,
    private crypt:CryptUtilityService
  ) {}

  public async save(user:CreateNewUserDto) {
    await this.validator.emailAlreadyExist(user.email)
    await this.validator.uidAlreadyExist(user.uid)
    await this.validator.providersIsValid(user.providers)
    user.password = await this.crypt.hash(user.password);
    const res = await this.repository.save(user)
    const perfilUser = new PerfilUserReturn(res)
    return new OK(
      [perfilUser],
      code.USER_REGISTERED,
      message.USER_REGISTERED
    )
  }

  public async findOne(id:any) {
    const res = await this.repository.findOne({ where:{ id: id }})
    return new PerfilUserReturn(res)
  }

  public async findAll() {
    const res = await this.repository.find();
    if(Object.keys(res).length == 0){
      throw new NotFoundExceptions({
        code:code.NOT_FOUND_USER,
        message:message.NOT_FOUND_USER,
      })
    }
    const perfilUser = res.map((r)=> new PerfilUserReturn(r))
    console.log(perfilUser)
    return new OK(perfilUser)
  }

  public async checkIfUserExistsByEmail(email:any) {
    const res = await this.repository.findOne({ where:{ email: email }})
    return new checkIfUserExistsByEmailReturn(res)
  }

  public async update(id:any, values:any) {
    await this.repository.update(id, values);
    const res = await this.repository.findOne(id)
    return new PerfilUserReturn(res)
  }

  public async delete(id:any) {
    await this.repository.delete(id);
    return "Usuario Deletado"
  }

  public async deleteTodosUsuarios() {
    await this.repository.deleteTodosUsuarios();
    return "Todos Usuarios Deletados"
  }
}

