import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'

import { CryptUtilityService } from '../../shared/crypt/crypt.utility.service'
import { UserRepository } from './user.repository'
import { Ok, Info, Exception  } from '../../exception/index'
import { UserValidator } from './user.validator'
import { PerfilUserReturn } from './return/perfil-user.return'
import { checkIfUserExistsByEmailReturn  } from './return/check-If-user-exists-by-email.return'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository) 
    private readonly repository: UserRepository, 
    private validator:UserValidator,
    private crypt:CryptUtilityService
  ) {}

  public async save(values) {
    await this.validator.emailAlreadyExist(values.email)
    values.password = await this.crypt.hash(values.password);
    const res = await this.repository.save(values)
    const perfilUser = new PerfilUserReturn(res)
    return new Ok([perfilUser])
  }

  public async findOne(id) {
    const res = await this.repository.findOne({ where:{ id: id }})
    return new PerfilUserReturn(res)
  }

  public async findAll() {
    const res = await this.repository.find();
    if(Object.keys(res).length == 0){
      throw new Exception().NotFoundException({
        code: "not_found_user",
        message: "Não foi encontrado usuarios na base de dados"
      })
    }
    const perfilUser = res.map((r)=> new PerfilUserReturn(r))
    return new Ok(perfilUser)
  }

  public async checkIfUserExistsByEmail(email) {
    const res = await this.repository.findOne({ where:{ email: email }})
    return new checkIfUserExistsByEmailReturn(res)
  }

  public async update(id, values) {
    await this.repository.update(id, values);
    const res = await this.repository.findOne(id)
    return new PerfilUserReturn(res)
  }

  public async delete(id) {
    await this.repository.delete(id);
    return "Usuario Deletado"
  }

  public async deleteTodosUsuarios() {
    await this.repository.deleteTodosUsuarios();
    return "Todos Usuarios Deletados"
  }
}

