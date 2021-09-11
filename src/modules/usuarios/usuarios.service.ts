import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { UsuariosRepository } from './usuarios.repository'
import { hash, compare } from 'bcryptjs';

import { UpdateDto  } from './dto/update.dto'
import { RetornoDto  } from './dto/retorno.dto'
import { checkIfUserExistsByEmailDTO  } from './dto/checkIfUserExistsByEmailDTO'

@Injectable()
export class UsuariosService {

  constructor(@InjectRepository(UsuariosRepository) private readonly repository: UsuariosRepository) {}

  public async save(values) {
    values.senha = await hash(values.senha, 10);
    const res = await this.repository.save(values)
    return new RetornoDto(res)
  }

  public async signIn(user) {
    const userData = await this.repository.findOne({ where:{ email: user.email }})
    if (!userData) {
      return {
        message: 'email is incorrect',
        status: 404,
      };
    }

    const result = await compare(user.senha, userData.senha)
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
    return new RetornoDto(res)
  }

  public async checkIfUserExistsByEmail(email) {
    const res = await this.repository.findOne({ where:{ email: email }})
    return new checkIfUserExistsByEmailDTO(res)
  }

  public async findAll() {
    const res = await this.repository.find();
    return res.map((r)=> new RetornoDto(r))
  }

  public async update(id, values:UpdateDto) {
    await this.repository.update(id, values);
    const res = await this.repository.findOne(id)
    return new RetornoDto(res)
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

