import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'

import { CryptUtilityService } from '../../shared/bcrypt/bcrypt.service'
import { UserRepository } from './user.repository'
import { OK, NotFoundExceptions } from '../../service/exception'
import { UserValidator } from './user.validator'
import { PerfilUserMapper, CheckUserExistsByEmailMapper } from './mapper'
import { code, message } from '../../shared/enum'
import { CreateNewUserDto, UpdateUserDto } from './dto'
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository) 
    private readonly repository: UserRepository, 
    private validator:UserValidator,
    private crypt:CryptUtilityService,
    private perfilUserMapper:PerfilUserMapper,
    private checkUserExistsByEmailMapper:CheckUserExistsByEmailMapper
  ) {}

  public async save(user:CreateNewUserDto) {
    await this.validator.emailAlreadyExist(user.email)
    await this.validator.uidAlreadyExist(user.uid)
    await this.validator.providersIsValid(user.providers)
    user.password = await this.crypt.hash(user.password);
    const res = await this.repository.save(user)
    const mappings = this.perfilUserMapper.toDto(res)
    return new OK(
      [mappings],
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
    const mappings = res.map((r)=> this.perfilUserMapper.toDto(r))
    return new OK(mappings)
  }

  public async getUserByUid(uid:string) {
    const res = await this.validator.getUserByUid(uid)
    const mappings = this.perfilUserMapper.toDto(res)
    return new OK([mappings])
  }

  public async getUserByEmail(email:string) {
    const res = await this.validator.getUserByEmail(email)
    const mappings = this.perfilUserMapper.toDto(res)
    return new OK([mappings])
  }

  public async checkUserExistsByEmail(email:string) {
    const res = await this.validator.getUserByEmail(email)
    const mappings = this.checkUserExistsByEmailMapper.toDto(res)
    return new OK([mappings])
  }

  public async updateUserByUid(uid:string, user:UpdateUserDto) {
    const { id } = await this.validator.getUserByUid(uid)
    await this.validator.updateUserByUid(id, user)
    const res = await this.validator.getUserByUid(uid)
    const mappings = this.perfilUserMapper.toDto(res)
    return new OK([mappings], code.USER_UPDATED, message.USER_UPDATED) 
  }

  public async deleteUserByUid(uid:any) {
    const { id } = await this.validator.getUserByUid(uid)
    await this.validator.deleteUserByUid(id)
    return new OK([], code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }

  public async deleteTodosUsuarios() {
    await this.repository.deleteTodosUsuarios();
    return new OK([],code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }
}

