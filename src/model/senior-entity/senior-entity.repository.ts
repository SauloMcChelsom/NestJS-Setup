import { EntityRepository, Repository } from 'typeorm'
import { UserSeniorEntity } from '@entity/senior/user.senior.entity'
import { CheckInSeniorEntity } from '@entity/senior/check-in.senior.entity'

@EntityRepository(UserSeniorEntity)
export class UserSeniorEntityRepository extends Repository<UserSeniorEntity> {}

@EntityRepository(CheckInSeniorEntity)
export class CheckInSeniorEntityRepository extends Repository<CheckInSeniorEntity> {

    async pessoasAindaPresentes(limit:number=3, offset:number=0, order:any='ASC', column:string='id'){
        return await this.createQueryBuilder('check_in_senior')
        .innerJoinAndSelect("check_in_senior.senior_id", "user_senior")
        .where(`${'now() < check_in_senior.dateOut'}`)
        .orderBy(`check_in_senior.${column}`, order)
        .limit(limit)
        .offset(offset)
        .getMany();
    }

    async pessoasQueJaDeixaramHotel(limit:number=3, offset:number=0, order:any='ASC', column:string='id'){
        return await this.createQueryBuilder('check_in_senior')
        .innerJoinAndSelect("check_in_senior.senior_id", "user_senior")
        .where(`${'now() > check_in_senior.dateOut'}`)
        .orderBy(`check_in_senior.${column}`, order)
        .limit(limit)
        .offset(offset)
        .getMany();
    }
}