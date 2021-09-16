import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { hash, compare } from 'bcryptjs';

import { RetornPerfilUser } from './map/retorn-perfil-user.map'
import { checkIfUserExistsByEmailMap  } from './map/check-If-user-exists-by-email.map'

@Injectable()
export class UserService {

  constructor(@InjectRepository(UserRepository) private readonly repository: UserRepository) {}

  public async save(values) {
    values.senha = await hash(values.senha, 10);
    const res = await this.repository.save(values)
    return new RetornPerfilUser(res)
  }

  public async signIn(user) {
    const userData = await this.repository.findOne({ where:{ email: user.email }})
    if (!userData) {
      return {
        message: 'email is incorrect',
        status: 404,
      };
    }

    const result = await compare(user.password, userData.password)
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
    return res.map((r)=> new RetornPerfilUser(r))
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

