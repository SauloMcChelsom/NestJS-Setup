import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { code } from '@root/src/lib/enum';

import { CommentEntity as Photo } from '../../../src/entity/comment.entity';

import { CommentRepository as Comment } from './comment.repository';

@Injectable()
export class PhotoService {

  constructor(

    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>

  ) {}

  async findAll(id:number) {
    return await this.photoRepository.findOne(id);
  }

  public async findOneById(id: number) {
    
    try {
      const res = await this.photoRepository.findOne(id);
      if (res) {
        return res;
      }
      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {

      throw new HttpException(e.response, e.status);
    }
  }
}