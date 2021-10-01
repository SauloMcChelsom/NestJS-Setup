import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'

import { CryptUtilityService } from '../../shared/bcrypt/bcrypt.service'
import { UserRepository } from './user.repository'
import { OK, NotFoundExceptions } from '../../service/exception'
import { UserValidator } from './user.validator'
import { PerfilUserReturn } from './return/perfil-user.return'
import { checkIfUserExistsByEmailReturn  } from './return/check-If-user-exists-by-email.return'
import { code, message } from '../../shared/enum'
import { CreateNewUserDto, UpdateUserDto } from './dto'
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

  public async findAll() {
    const res = await this.repository.find();
    if(Object.keys(res).length == 0){
      throw new NotFoundExceptions({
        code:code.NOT_FOUND_USER,
        message:message.NOT_FOUND_USER,
      })
    }
    const perfilUser = res.map((r)=> new PerfilUserReturn(r))
    return new OK(perfilUser)
  }

  public async getUserByUid(uid:string) {
    const res = await this.validator.getUserByUid(uid)
    const perfilUser = new PerfilUserReturn(res)
    return new OK([perfilUser])
  }

  public async getUserByEmail(email:string) {
    const res = await this.validator.getUserByEmail(email)
    const perfilUser = new PerfilUserReturn(res)
    return new OK([perfilUser])
  }

  public async updateUserByUid(uid:string, user:UpdateUserDto) {
    const { id } = await this.validator.getUserByUid(uid)
    await this.validator.updateUserByUid(id, user)
    const res = await this.validator.getUserByUid(uid)
    const perfilUser = new PerfilUserReturn(res)
    return new OK([perfilUser], code.USER_UPDATED, message.USER_UPDATED) 
  }

  public async deleteUserByUid(uid:any) {
    const { id } = await this.validator.getUserByUid(uid)
    await this.validator.deleteUserByUid(id)
    return new OK([], code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }

  public async deleteTodosUsuarios() {
    await this.repository.deleteTodosUsuarios();
    return new OK([], code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }
}

