import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@entity/user.entity';

@EntityRepository(UserEntity)
export class UserEntityRepository extends Repository<UserEntity> {}
