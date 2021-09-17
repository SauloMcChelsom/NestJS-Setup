import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'

import { CryptUtilityService } from '../../utility/crypt/crypt.utility.service'
import { UserRepository } from './user.repository'
import { Client, code  } from '../../exception/index.exception'
import { UserValidator } from './user.validator'
import { RetornPerfilUser } from './map/retorn-perfil-user.map'
import { checkIfUserExistsByEmailMap  } from './map/check-If-user-exists-by-email.map'

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
    const perfilUser = new RetornPerfilUser(res)
    return new Client().OK([perfilUser])
  }

  public async signIn(user) {
    const userData = await this.repository.findOne({ where:{ email: user.email }})
    if (!userData) {
      return {
        message: 'email is incorrect',
        status: 404,
      };
    }

    const result = await this.crypt.compare(user.password, userData.password)
    if (!result) {
      return {
        message: 'Password is incorrect',
        status: 404,
      };
    }

    return "logado"
  }

  public async findOne(id) {
    const res = await this.repository.findOne({ where:{ id: id }})
    return new RetornPerfilUser(res)
  }

  public async checkIfUserExistsByEmail(email) {
    const res = await this.repository.findOne({ where:{ email: email }})
    return new checkIfUserExistsByEmailMap(res)
  }

  public async findAll() {
    const res = await this.repository.find();
    if(Object.keys(res).length == 0){
      throw new Client().NotFoundException({
        code: "not_found_user",
        message: "Não foi encontrado usuarios na base de dados"
      })
    }
    const perfilUser = res.map((r)=> new RetornPerfilUser(r))
    return new Client().OK(perfilUser)
  }

  public async update(id, values) {
    await this.repository.update(id, values);
    const res = await this.repository.findOne(id)
    return new RetornPerfilUser(res)
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

