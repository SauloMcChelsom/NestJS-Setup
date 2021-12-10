import { EntityRepository, Repository } from 'typeorm'
import { CommentEntity } from '@root/src/entity/comment.entity'

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {}