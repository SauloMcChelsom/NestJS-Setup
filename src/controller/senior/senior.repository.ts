import { EntityRepository, Repository } from 'typeorm'
import { SeniorEntity } from '@root/src/entity/senior.entity'
import { CheckInEntity } from '@root/src/entity/check-in.entity'

@EntityRepository(SeniorEntity)
export class SeniorRepository extends Repository<SeniorEntity> {
    
}


@EntityRepository(CheckInEntity)
export class CheckInRepository extends Repository<CheckInEntity> {

    async pessoasAindaPresentes(limit:number=3, offset:number=0, order:any='ASC', column:string='id'){
        return await this.createQueryBuilder('check_in')
        .innerJoinAndSelect("check_in.senior_id", "senior")
        .where(`${'now() < check_in.dataSaida'}`)
        .orderBy(`check_in.${column}`, order)
        .limit(limit)
        .offset(offset)
        .getMany();
    }

    async pessoasQueJaDeixaramHotel(limit:number=3, offset:number=0, order:any='ASC', column:string='id'){
        return await this.createQueryBuilder('check_in')
        .innerJoinAndSelect("check_in.senior_id", "senior")
        .where(`${'now() > check_in.dataSaida'}`)
        .orderBy(`check_in.${column}`, order)
        .limit(limit)
        .offset(offset)
        .getMany();
    }
}