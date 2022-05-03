import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare  } from 'bcryptjs';

import { code, message } from '@root/src/shared/enum';

import { UserEntityRepository } from './user-entity.repository';

import { User } from '@root/src/shared/interfaces/user.interface';

export class UserEntityModel {
  constructor(
    @InjectRepository(UserEntityRepository)
    private readonly repository: UserEntityRepository,
  ) {}

  public async hashPassword(password: string) {
    return await hash(password, 12)
  }

  public async compare(textoLegivel: string, hash: string){
    return await compare(textoLegivel, hash)
  }

  public async comparePasswords(newPassword: string, passwortHash: string): Promise<any>{
    return await compare(newPassword, passwortHash)
  }

  public async create(user:User){
    return await this.repository.save(user).catch((err) => {
        throw new HttpException({
          code : 'QUERY_FAILED',
          message : `${err.detail || err.hint || err.routine}`,
        }, HttpStatus.BAD_REQUEST)
    })
  }

  public async findOneUserByEmail(email:string){
    return await <User>this.repository.findOne({where: { email: email}}).catch((err) => {
        throw new HttpException({
          code : 'QUERY_FAILED',
          message : err,
        }, HttpStatus.BAD_REQUEST)
    })
  }

  public async validateEmailPasswordUser(email: string, user_password: string): Promise<User> {
    let user: User = await this.findOneUserByEmail(email)
   
    if(!user) {
        throw new HttpException({
            code : 'not_found',
            message : 'User not found'
        }, HttpStatus.BAD_REQUEST)
    }

    let match: boolean = await this.comparePasswords(user_password, user.password)       
   
    if(match == false) {
        throw new HttpException({
            code : 'different_password',
            message : 'Different password'
        }, HttpStatus.BAD_REQUEST)
    }

    const {password, ...result} = user
    return result
  }

  public async findOneUserByUserId(user_id:number){
    return await this.repository.findOne({where: { uid: user_id}}).catch((err) => {
        throw new HttpException({
          code : 'QUERY_FAILED',
          message : `${err.detail || err.hint || err.routine}`,
        }, HttpStatus.BAD_REQUEST)
    })
  }

  public async findOneUserById(id:number){
    let user:User =  await this.repository.findOne({where: { id: id}}).catch((err) => {
        throw new HttpException({
          code : 'QUERY_FAILED',
          message : `${err.detail || err.hint || err.routine}`,
        }, HttpStatus.BAD_REQUEST)
    })

    if(!user) {
        throw new HttpException({
            code : 'not_found',
            message : 'User not found'
        }, HttpStatus.BAD_REQUEST)
    }

    return user
  }

  public async validateEmailForCreateNewAccount(email: string) {
    let user: User = await this.findOneUserByEmail(email)
        
    if(user) {
        throw new HttpException({
            code : 'user_already_exists',
            message : 'User already exists'
        }, HttpStatus.BAD_REQUEST)
    }
  }

  public async getUserById(id): Promise<User>{
    try {

        let user: User = await this.findOneUserById(id)

        if(!user){
            throw new HttpException({
                code : 'not found',
                message : 'user not found'
            }, HttpStatus.BAD_REQUEST)
        }

        const {password, ...result} = user
        return result

    } catch (e: any) {
        throw new HttpException(e.response, e.status)
    }
  }

  public async emailAlreadyExist(email: string) {
    try {
      const res = await this.repository.findOne({ where: { email: email } });
      if (res) {
        throw new HttpException(code.EMAIL_ALREADY_IN_USE, 409);
      }
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async uidAlreadyExist(uid: string) {
    try {
      const res = await this.repository.findOne({ where: { uid: uid } });
      if (res) {
        throw new HttpException(code.UID_ALREADY_IN_USE, 409);
      }
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async getUserByUid(uid: string) {
    try {
      const res = await this.repository.findOne({ where: { uid: uid } });
      if (res) {
        return res;
      }
      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async getUserByEmail(email: string) {
    try {
      const res = await this.repository.findOne({ where: { email: email } });
      if (res) {
        return res;
      }
      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async updateUserByUid(id: number, body: any) {
    try {
      const res = await this.repository.update(id, body);
      if (res) {
        return res;
      }
      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async delete(id: number) {
    try {
      const res = await this.repository.delete(id);
      if (res) {
        return res;
      }
      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async findAll(){
    let user:User[] =  await this.repository.find().catch((err) => {
        throw new HttpException({
          code : 'QUERY_FAILED',
          message : `${err.detail || err.hint || err.routine}`,
        }, HttpStatus.BAD_REQUEST)
    })

    if(!user) {
        throw new HttpException({
            code : 'not_found',
            message : 'User not found'
        }, HttpStatus.BAD_REQUEST)
    }

    return user
  }
}
