import { EntityRepository, Repository } from 'typeorm'
import { UserEntity } from '@entity/user.entity'

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  async deleteUserByUid(id:any){
    return await this.createQueryBuilder()
    .delete()
    .where("id = :id", { id: id })
    .from("user")
    .execute();
  }
}
