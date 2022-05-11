import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionManager } from 'typeorm';

import { UserEntity } from '@entity/user.entity';
import { connectionDataBaseForTest } from '@root/connection-database-for-test-unit';

import { UserEntityModel} from '../user-entity.model';
import { userBy, CommentCreate } from '@root/src/params.jest'

describe('userModel', () => {
  let model: UserEntityModel;
  let CREATE

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
      const res = await model.findOneUserByEmail(userBy.email)
      await expect(res.id).isNumber()
      await expect(res.email).toBe(userBy.email)
      await expect(res.role).toBe('user')
      await expect(res.uid).isStrings()
      await expect(res.name).isStrings()
    });

    it('validateEmailPasswordUser', async () => {
      const res = await model.validateEmailPasswordUser(userBy.email, '123456789')
      await expect(res.id).isNumber()
      await expect(res.email).toBe(userBy.email)
      await expect(res.role).toBe('user')
      await expect(res.uid).isStrings()
      await expect(res.name).isStrings()
    });

    it('findUserByUserUid', async () => {
      const res = await model.findUserByUserUid(userBy.uid)
      await expect(res.id).isNumber()
      await expect(res.email).toBe(userBy.email)
      await expect(res.role).toBe('user')
      await expect(res.uid).isStrings()
      await expect(res.name).isStrings()
    });

    it('findOneUserById', async () => {
      const res = await model.findOneUserById(userBy.id)
      await expect(res.id).isNumber()
      await expect(res.email).toBe(userBy.email)
      await expect(res.role).toBe('user')
      await expect(res.uid).isStrings()
      await expect(res.name).isStrings()
    });

    it('validateEmailForCreateNewAccount', async () => {
      const res = await model.validateEmailForCreateNewAccount(userBy.email)
      await expect(res).toBe('EMAIL_NOT_FOUND')
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