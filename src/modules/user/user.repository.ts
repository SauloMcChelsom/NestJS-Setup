import { EntityRepository, Repository } from 'typeorm'
import { UserEntity } from '@entity/user.entity'

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  async deleteTodosUsuarios(){
    return await this.createQueryBuilder()
    .delete()
    //.where("id = :id", { id: 32 })
    .from("user")
    .execute();
  }
}
