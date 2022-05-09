import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hash, compare  } from 'bcryptjs'

import { code, message } from '@root/src/shared/enum'

import { UserEntityRepository } from './user-entity.repository'

import { User } from '@root/src/shared/interfaces/user.interface'

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
          message : err,
          description: "save failed",
        }, HttpStatus.BAD_REQUEST)
    })
  }

  public async findOneUserByEmail(email:string) {
    try {

      const res = await this.repository.findOne({where: { email: email}}).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (res) {
        return res
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not found user by email',
        description : `the email '${email}' is not registered`
      }, HttpStatus.NOT_FOUND)

    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async validateEmailPasswordUser(email: string, user_password: string): Promise<User> {
    let user: User = await this.findOneUserByEmail(email)

    let match: boolean = await this.comparePasswords(user_password, user.password)       
   
    if(match == false) {
      throw new HttpException({
          code : 'different_password',
          message : 'Different password',
          description: "",
      }, HttpStatus.BAD_REQUEST)
    }

    const {password, ...result} = user
    return result
  }

  public async findUserByUserUid(uid: string) {
    try {

      const res = await this.repository.findOne({where: { uid: uid}}).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (res) {
        return res;
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not found user by uid',
        description : ''
      }, HttpStatus.NOT_FOUND)

    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async findOneUserById(id:number) {
    try {

      const res = await this.repository.findOne({where: { id: id}}).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (res) {
        return res;
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not found user by id',
        description : ''
      }, HttpStatus.NOT_FOUND)

    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async validateEmailForCreateNewAccount(email: string) {
    try {

      const user = await this.repository.findOne({where: { email: email}}).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })
          
      if(user) {
        throw new HttpException({
          code :  code.EMAIL_ALREADY_IN_USE,
          message : message.EMAIL_ALREADY_IN_USE,
          description : ''
        }, HttpStatus.CONFLICT)
      }

    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }
  
  public async getUserById(id): Promise<User>{
    try {

        let user: User = await this.findOneUserById(id).catch((err) => {
          throw new HttpException({
            code : code.QUERY_FAILED,
            message : `${err}`,
            description : ''
          }, HttpStatus.BAD_REQUEST)
        })

        if(!user){
            throw new HttpException({
              code :  code.NOT_FOUND,
              message : message.NOT_FOUND,
              description : ''
            }, HttpStatus.NOT_FOUND)
        }

        const {password, ...result} = user
        return result

    } catch (e: any) {
        throw new HttpException(e.response, e.status)
    }
  }

  public async emailAlreadyExist(email: string) {
    try {
      const res = await this.repository.findOne({ where: { email: email } }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })
      if (res) {
        throw new HttpException({
          code :  code.EMAIL_ALREADY_IN_USE,
          message : message.EMAIL_ALREADY_IN_USE,
          description : ''
        }, HttpStatus.CONFLICT)
      }
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async uidAlreadyExist(uid: string) {
    try {
      const res = await this.repository.findOne({ where: { uid: uid } }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })
      if (res) {
        throw new HttpException({
          code :  code.UID_ALREADY_IN_USE,
          message : message.UID_ALREADY_IN_USE,
          description : ''
        }, HttpStatus.CONFLICT)
      }
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async getUserByUid(uid: string) {
    try {

      const res = await this.repository.findOne({ where: { uid: uid } }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (res) {
        return res
      }

      throw new HttpException({
        code:code.UID_NOT_FOUND,
        message: message.UID_NOT_FOUND,
        description: "Must be passed a valid or existing uid",
      }, HttpStatus.NOT_FOUND)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async getUserByEmail(email: string) {
    try {

      const res = await this.repository.findOne({ where: { email: email } }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (res) {
        return res
      }

      throw new HttpException({
        code:code.EMAIL_NOT_FOUND,
        message: message.EMAIL_NOT_FOUND,
        description: `o email ${email} não foi cadastrado`,
      }, HttpStatus.NOT_FOUND)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
}

  public async updateUserByUid(id: number, body: any) {
    try {
      const res = await this.repository.update(id, body).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if(!res){
        throw new HttpException({
          code : code.NOT_FOUND,
          message : 'update, uid not found',
          description : ''
        }, HttpStatus.NOT_FOUND)
      }

      if (res.affected == 1) {
        return {
          code : code.SUCCESSFULLY_UPDATED,
          message : message.SUCCESSFULLY_UPDATED,
          description : ''
        }
      }
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async delete(id: number) {
    try {

      const res = await this.repository.delete(id).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      });

      if(!res){
        throw new HttpException({
          code : code.NOT_FOUND,
          message : 'delete, id not found',
          description : ''
        }, HttpStatus.NOT_FOUND)
      }

      if (res.affected == 1) {
        return {
          code : code.SUCCESSFULLY_DELETED,
          message : message.SUCCESSFULLY_DELETED,
          description : ''
        };
      }
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async findAll(){
    try {
      let user:User[] =  await this.repository.find().catch((err) => {
        throw new HttpException({
          code : 'QUERY_FAILED',
          message : `${err.detail || err.hint || err.routine}`,
        }, HttpStatus.BAD_REQUEST)
      })

      if(!user) {
        throw new HttpException({
          code:code.USER_FOUND,
          message: message.USER_FOUND,
          description : ''
        }, HttpStatus.NOT_FOUND)
      }

      return user
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }
}
