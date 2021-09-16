import { EntityRepository, Repository } from 'typeorm'
import { UserEntity } from '../../entity/user.entity'

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  async findOneByCpf(cpfCnpj: string): Promise<UserEntity> {
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
