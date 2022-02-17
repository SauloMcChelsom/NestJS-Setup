
import { Test, TestingModule } from '@nestjs/testing';
import { PhotoService as SpaceshipsService} from '../../photo.service';
import { TypeOrmSQLITETestingModule } from './test-utils/TypeOrmSQLITETestingModule';
import { getConnectionManager } from 'typeorm';
import { HttpException } from '@nestjs/common';


describe('SpaceshipsService', () => {
  let service: SpaceshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [SpaceshipsService],
    }).compile();

    service = module.get<SpaceshipsService>(SpaceshipsService);
  });


  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    getConnectionManager().get().close()
    done()
  })


  describe('findOne', () => {

    it('listSpaceships', async () => {
      const spaceships = await service.findOneById(2);
      await expect(typeof spaceships).toEqual('object')
    });
  
    it('NOT_FOUND', async () => {
      try {
        await service.findOneById(1);
      } catch (e: any) {
        await expect(e).toEqual(new HttpException('NOT_FOUND', 404))
      }
    });
  })

  
  beforeAll( ( ) => {


   


});



});