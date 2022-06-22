import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionManager } from 'typeorm';

import { UserEntity } from '@entity/user.entity';
import { connectionDataBaseForTest } from '@root/connection-database-for-test-unit';

import { UserEntityModel} from '../user-entity.model';
import { UserBy, UserCreate } from '@root/src/params.jest'

export enum Role {
  ADMIN = 'admin',
  CHIEFEDITOR = 'chiefeditor',    
  EDITOR = 'editor',
  USER = 'user'
}

describe('userModel', () => {
  let model: UserEntityModel
  let CREATE:any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...connectionDataBaseForTest(), 
        TypeOrmModule.forFeature([UserEntity])
      ],
      providers: [
        UserEntityModel
      ],
    }).compile();
    model = module.get<UserEntityModel>(UserEntityModel);    
  });

  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    getConnectionManager().get().close()
    done()
  })

  describe('', () => {
    it('findOneUserByEmail', async () => {
      const res = await model.findOneUserByEmail(UserBy.email)
      await expect(res.id).isNumber()
      await expect(res.email).toBe(UserBy.email)
      await expect(res.role).toBe('user')
      await expect(res.uid).isStrings()
      await expect(res.name).isStrings()
    });

    it('validateEmailPasswordUser', async () => {
      const res = await model.validateEmailPasswordUser(UserBy.email, '123456789')
      await expect(res.id).isNumber()
      await expect(res.email).toBe(UserBy.email)
      await expect(res.role).toBe('user')
      await expect(res.uid).isStrings()
      await expect(res.name).isStrings()
    });

    it('findUserByUserUid', async () => {
      const res = await model.findUserByUserUid(UserBy.uid)
      await expect(res.id).isNumber()
      await expect(res.email).toBe(UserBy.email)
      await expect(res.role).toBe('user')
      await expect(res.uid).isStrings()
      await expect(res.name).isStrings()
    });

    it('findOneUserById', async () => {
      const res = await model.findOneUserById(UserBy.id)
      await expect(res.id).isNumber()
      await expect(res.email).toBe(UserBy.email)
      await expect(res.role).toBe('user')
      await expect(res.uid).isStrings()
      await expect(res.name).isStrings()
    });

    it('validateEmailForCreateNewAccount', async () => {
      const res = await model.validateEmailForCreateNewAccount(UserBy.email+'A')
      await expect(res).toBe('EMAIL_NOT_FOUND')
    });

    it('validateEmailForCreateNewAccount', async () => {
      try {
        await model.validateEmailForCreateNewAccount(UserBy.email)
      } catch (e: any) {
        await expect(e.response.code).toEqual('EMAIL_ALREADY_IN_USE')
      }
    });

    it('getUserById', async () => {
      const res = await model.getUserById(UserBy.id)
      await expect(res.id).isNumber()
      await expect(res.email).toBe(UserBy.email)
      await expect(res.role).toBe('user')
      await expect(res.uid).isStrings()
      await expect(res.name).isStrings()
    });

    it('emailAlreadyExist', async () => {
      try {
        const res = await model.emailAlreadyExist(UserBy.email)
      } catch (e: any) {
        await expect(e.response.code).toEqual('EMAIL_ALREADY_IN_USE')
      }
    });

    it('uidAlreadyExist', async () => {
      try {
        const res = await model.uidAlreadyExist(UserBy.uid)
      } catch (e: any) {
        await expect(e.response.code).toEqual('UID_ALREADY_IN_USE')
      }
    });

    it('getUserByUid', async () => {
      const res = await model.getUserByUid(UserBy.uid)
      await expect(res.id).isNumber()
      await expect(res.email).toBe(UserBy.email)
      await expect(res.role).toBe('user')
      await expect(res.uid).isStrings()
      await expect(res.name).isStrings()
    });

    it('getUserByEmail', async () => {
      const res = await model.getUserByEmail(UserBy.email)
      await expect(res.id).isNumber()
      await expect(res.email).toBe(UserBy.email)
      await expect(res.role).toBe('user')
      await expect(res.uid).isStrings()
      await expect(res.name).isStrings()
    });

    it('findAll', async () => {
      const res = await model.findAll()
      await expect(res[0].id).isNumber()
      await expect(res[0].role).toBe('user')
      await expect(res[0].uid).isStrings()
      await expect(res[0].name).isStrings()
    });

    it('create', async () => {
      let create_new_user = UserCreate
      create_new_user.role=Role.USER
      const res = await model.create(create_new_user)
      CREATE = res
      await expect(CREATE.id).isNumber()
      await expect(CREATE.role).toBe('user')
      await expect(CREATE.uid).isStrings()
    });

    it('updateUserByUid', async () => {
      const res = await model.updateUserByUid(CREATE.id, CREATE)
      await expect(res.code).toBe('SUCCESSFULLY_UPDATED')
    });

    it('delete', async () => {
      const res = await model.delete(CREATE.id);
      await expect(res.code).toBe('SUCCESSFULLY_DELETED')
    });


  })
});

interface CustomMatchers<R = unknown> {
  toBeWithinRange(floor: number, ceiling: number): R;
  isNumber(floor?: number): R;
  isStrings(floor?: string): R;
  isDataTime(floor?: Date): R;
  isTrue(floor?: Date): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}