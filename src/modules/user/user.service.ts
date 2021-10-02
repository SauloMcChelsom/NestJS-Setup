import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'

import { CryptUtilityService } from '../../shared/bcrypt/bcrypt.service'
import { UserRepository } from './user.repository'
import { OK, NotFoundExceptions } from '../../service/exception'
import { UserValidate } from './user.validate'
import { PerfilUserMapper, CheckUserExistsByEmailMapper } from './mapper'
import { code, message } from '../../shared/enum'
import { CreateNewUserDto, UpdateUserDto } from './dto'
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository) 
    private readonly repository: UserRepository, 
    private validate:UserValidate,
    private crypt:CryptUtilityService,
    private perfilUserMapper:PerfilUserMapper,
    private checkUserExistsByEmailMapper:CheckUserExistsByEmailMapper
  ) {}

  public async save(user:CreateNewUserDto) {
    await this.validate.emailAlreadyExist(user.email)
    await this.validate.uidAlreadyExist(user.uid)
    await this.validate.providersIsValid(user.providers)
    user.password = await this.crypt.hash(user.password);
    const res = await this.repository.save(user)
    const mapped = this.perfilUserMapper.toDto(res)
    return new OK(
      [mapped],
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
    const mapped = res.map((r)=> this.perfilUserMapper.toDto(r))
    return new OK(mapped)
  }

  public async getUserByUid(uid:string) {
    const res = await this.validate.getUserByUid(uid)
    const mapped = this.perfilUserMapper.toDto(res)
    return new OK([mapped])
  }

  public async getUserByEmail(email:string) {
    const res = await this.validate.getUserByEmail(email)
    const mapped = this.perfilUserMapper.toDto(res)
    return new OK([mapped])
  }

  public async checkUserExistsByEmail(email:string) {
    const res = await this.validate.getUserByEmail(email)
    const mapped = this.checkUserExistsByEmailMapper.toDto(res)
    return new OK([mapped])
  }

  public async updateUserByUid(uid:string, user:UpdateUserDto) {
    const { id } = await this.validate.getUserByUid(uid)
    await this.validate.updateUserByUid(id, user)
    const res = await this.validate.getUserByUid(uid)
    const mapped = this.perfilUserMapper.toDto(res)
    return new OK([mapped], code.USER_UPDATED, message.USER_UPDATED) 
  }

  public async deleteUserByUid(uid:any) {
    const { id } = await this.validate.getUserByUid(uid)
    await this.validate.deleteUserByUid(id)
    return new OK([], code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }

  public async deleteTodosUsuarios() {
    await this.repository.deleteTodosUsuarios();
    return new OK([],code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }
}

