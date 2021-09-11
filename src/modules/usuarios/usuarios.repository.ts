import { EntityRepository, Repository } from 'typeorm'
import { UsuarioEntity } from '../../entity/usuario.entity'

@EntityRepository(UsuarioEntity)
export class UsuariosRepository extends Repository<UsuarioEntity> {

  async findOneByCpf(cpfCnpj: string): Promise<UsuarioEntity> {
    return await this.createQueryBuilder('user')
    .leftJoinAndSelect('user.cpfCnpj', 'user')
    .where(`user.cpfCnpj = '${cpfCnpj}'`)
    .offset(0)
    .getOne();
  }

  async deleteTodosUsuarios(){
    return await this.createQueryBuilder()
    .delete()
    //.where("id = :id", { id: 32 })
    .from("usuario")
    .execute();
  }
}
