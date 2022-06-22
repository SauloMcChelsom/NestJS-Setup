import { Injectable } from '@nestjs/common'
import { CreateLike, Like } from '@shared/interfaces/like.interface'
import { LikeEntityModel } from '@model/like-entity/like-entity.model'

@Injectable()
export class LikeService {
  constructor(private like: LikeEntityModel) {}

  public async create(body: CreateLike): Promise<Like> {
    return await this.like.create(body)
  }
}
